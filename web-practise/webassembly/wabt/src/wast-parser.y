/*
 * Copyright 2016 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

%{
#include <algorithm>
#include <cassert>
#include <cstdarg>
#include <cstdio>
#include <cstdlib>
#include <utility>

#include "binary-error-handler.h"
#include "binary-reader.h"
#include "binary-reader-ir.h"
#include "cast.h"
#include "literal.h"
#include "wast-parser.h"
#include "wast-parser-lexer-shared.h"

#define YYDEBUG 1

#define RELOCATE_STACK(type, array, stack_base, old_size, new_size)   \
  do {                                                                \
    type* new_stack = new type[new_size]();                           \
    std::move((stack_base), (stack_base) + (old_size), (new_stack));  \
    if ((stack_base) != (array)) {                                    \
      delete[](stack_base);                                           \
    } else {                                                          \
      for (size_t i = 0; i < (old_size); ++i) {                       \
        (stack_base)[i].~type();                                      \
      }                                                               \
    }                                                                 \
    /* Cache the pointer in the parser struct to be deleted later. */ \
    parser->array = (stack_base) = new_stack;                         \
  } while (0)

#define yyoverflow(message, ss, ss_size, vs, vs_size, ls, ls_size, new_size) \
  do {                                                                       \
    size_t old_size = *(new_size);                                           \
    *(new_size) *= 2;                                                        \
    RELOCATE_STACK(yytype_int16, yyssa, *(ss), old_size, *(new_size));       \
    RELOCATE_STACK(YYSTYPE, yyvsa, *(vs), old_size, *(new_size));            \
    RELOCATE_STACK(YYLTYPE, yylsa, *(ls), old_size, *(new_size));            \
  } while (0)

#define DUPTEXT(dst, src)                                \
  (dst).start = wabt_strndup((src).start, (src).length); \
  (dst).length = (src).length

#define YYLLOC_DEFAULT(Current, Rhs, N)                       \
  do                                                          \
    if (N) {                                                  \
      (Current).filename = YYRHSLOC(Rhs, 1).filename;         \
      (Current).line = YYRHSLOC(Rhs, 1).line;                 \
      (Current).first_column = YYRHSLOC(Rhs, 1).first_column; \
      if (YYRHSLOC(Rhs, N).line == (Current).line)            \
        (Current).last_column = YYRHSLOC(Rhs, N).last_column; \
      else                                                    \
        (Current).last_column = YYRHSLOC(Rhs, 1).last_column; \
    } else {                                                  \
      (Current).filename = nullptr;                           \
      (Current).line = YYRHSLOC(Rhs, 0).line;                 \
      (Current).first_column = (Current).last_column =        \
          YYRHSLOC(Rhs, 0).last_column;                       \
    }                                                         \
  while (0)

#define CHECK_END_LABEL(loc, begin_label, end_label)                       \
  do {                                                                     \
    if (!string_slice_is_empty(&(end_label))) {                            \
      if (string_slice_is_empty(&(begin_label))) {                         \
        wast_parser_error(&loc, lexer, parser,                             \
                          "unexpected label \"" PRIstringslice "\"",       \
                          WABT_PRINTF_STRING_SLICE_ARG(end_label));        \
      } else if (!string_slices_are_equal(&(begin_label), &(end_label))) { \
        wast_parser_error(&loc, lexer, parser,                             \
                          "mismatching label \"" PRIstringslice            \
                          "\" != \"" PRIstringslice "\"",                  \
                          WABT_PRINTF_STRING_SLICE_ARG(begin_label),       \
                          WABT_PRINTF_STRING_SLICE_ARG(end_label));        \
      }                                                                    \
      destroy_string_slice(&(end_label));                                  \
    }                                                                      \
  } while (0)

#define CHECK_ALLOW_EXCEPTIONS(loc, opcode_name)                      \
  do {                                                                \
    if (!parser->options->allow_future_exceptions) {                   \
      wast_parser_error(loc, lexer, parser, "opcode not allowed: %s", \
                        opcode_name);                                 \
    }                                                                 \
 } while (0)

#define YYMALLOC(size) new char [size]
#define YYFREE(p) delete [] (p)

#define USE_NATURAL_ALIGNMENT (~0)

namespace wabt {

static bool is_power_of_two(uint32_t x) {
  return x && ((x & (x - 1)) == 0);
}

static Result parse_const(Type type,
                          LiteralType literal_type,
                          const char* s,
                          const char* end,
                          Const* out);
static void dup_text_list(TextList* text_list,
                          char** out_data,
                          size_t* out_size);

static void reverse_bindings(TypeVector*, BindingHash*);

static bool is_empty_signature(const FuncSignature* sig);

static void check_import_ordering(Location* loc,
                                  WastLexer* lexer,
                                  WastParser* parser,
                                  Module* module,
                                  ModuleField* first);
static void append_module_fields(Module*, ModuleField*);

class BinaryErrorHandlerModule : public BinaryErrorHandler {
 public:
  BinaryErrorHandlerModule(Location* loc, WastLexer* lexer, WastParser* parser);
  bool OnError(Offset offset, const std::string& error) override;

 private:
  Location* loc_;
  WastLexer* lexer_;
  WastParser* parser_;
};

#define wabt_wast_parser_lex(...) lexer->GetToken(__VA_ARGS__, parser)
#define wabt_wast_parser_error wast_parser_error

%}

%define api.prefix {wabt_wast_parser_}
%define api.pure true
%define api.value.type {::wabt::Token}
%define api.token.prefix {WABT_TOKEN_TYPE_}
%define parse.error verbose
%parse-param {::wabt::WastLexer* lexer} {::wabt::WastParser* parser}
%locations

%token LPAR "("
%token RPAR ")"
%token NAT INT FLOAT TEXT VAR VALUE_TYPE ANYFUNC MUT
%token NOP DROP BLOCK END IF THEN ELSE LOOP BR BR_IF BR_TABLE
%token TRY CATCH CATCH_ALL THROW RETHROW
%token LPAR_CATCH LPAR_CATCH_ALL
%token CALL CALL_INDIRECT RETURN
%token GET_LOCAL SET_LOCAL TEE_LOCAL GET_GLOBAL SET_GLOBAL
%token LOAD STORE OFFSET_EQ_NAT ALIGN_EQ_NAT
%token CONST UNARY BINARY COMPARE CONVERT SELECT
%token UNREACHABLE CURRENT_MEMORY GROW_MEMORY
%token FUNC START TYPE PARAM RESULT LOCAL GLOBAL
%token TABLE ELEM MEMORY DATA OFFSET IMPORT EXPORT EXCEPT
%token MODULE BIN QUOTE
%token REGISTER INVOKE GET
%token ASSERT_MALFORMED ASSERT_INVALID ASSERT_UNLINKABLE
%token ASSERT_RETURN ASSERT_RETURN_CANONICAL_NAN ASSERT_RETURN_ARITHMETIC_NAN
%token ASSERT_TRAP ASSERT_EXHAUSTION
%token EOF 0 "EOF"

%type<opcode> BINARY COMPARE CONVERT LOAD STORE UNARY
%type<text> ALIGN_EQ_NAT OFFSET_EQ_NAT TEXT VAR
%type<type> SELECT
%type<type> CONST VALUE_TYPE
%type<literal> NAT INT FLOAT

%type<action> action
%type<block> block
%type<command> assertion cmd
%type<commands> cmd_list
%type<const_> const
%type<consts> const_list
%type<exception> exception
%type<export_> export_desc inline_export
%type<expr> plain_instr block_instr
%type<catch_> plain_catch plain_catch_all catch_instr catch_sexp
%type<expr_list> instr instr_list expr expr1 expr_list if_ if_block const_expr offset
%type<func> func_fields_body func_fields_body1 func_result_body func_body func_body1
%type<func> func_fields_import func_fields_import1 func_fields_import_result
%type<func_sig> func_sig func_sig_result func_type
%type<global> global_type
%type<import> import_desc inline_import
%type<limits> limits
%type<memory> memory_sig
%type<module> module module_fields_opt module_fields inline_module
%type<module_field> type_def start data elem import export exception_field
%type<module_fields> func func_fields table table_fields memory memory_fields global global_fields module_field
%type<script_module> script_module
%type<literal> literal
%type<script> script
%type<table> table_sig
%type<text> bind_var bind_var_opt labeling_opt quoted_text
%type<text_list> text_list text_list_opt
%type<try_expr> try_ catch_sexp_list catch_instr_list
%type<types> block_sig value_type_list
%type<u32> align_opt
%type<u64> nat offset_opt
%type<vars> var_list
%type<var> type_use var script_var_opt

/* These non-terminals use the types below that have destructors, but the
 * memory is shared with the lexer, so should not be destroyed. */
%destructor {} ALIGN_EQ_NAT OFFSET_EQ_NAT TEXT VAR NAT INT FLOAT
%destructor { destroy_string_slice(&$$); } <text>
%destructor { destroy_string_slice(&$$.text); } <literal>
%destructor { delete $$; } <action>
%destructor { delete $$; } <block>
%destructor { delete $$; } <command>
%destructor { delete $$; } <commands>
%destructor { delete $$; } <consts>
%destructor { delete $$; } <export_>
%destructor { delete $$; } <expr>
%destructor { delete $$; } <expr_list>
%destructor { destroy_module_field_list(&$$); } <module_fields>
%destructor { delete $$; } <func>
%destructor { delete $$; } <func_sig>
%destructor { delete $$; } <global>
%destructor { delete $$; } <import>
%destructor { delete $$; } <memory>
%destructor { delete $$; } <module>
%destructor { delete $$; } <script_module>
%destructor { delete $$; } <script>
%destructor { destroy_text_list(&$$); } <text_list>
%destructor { delete $$; } <types>
%destructor { delete $$; } <var>
%destructor { delete $$; } <vars>


%nonassoc LOW
%nonassoc VAR

%start script_start

%%

/* Auxiliaries */

text_list :
    TEXT {
      TextListNode* node = new TextListNode();
      DUPTEXT(node->text, $1);
      node->next = nullptr;
      $$.first = $$.last = node;
    }
  | text_list TEXT {
      $$ = $1;
      TextListNode* node = new TextListNode();
      DUPTEXT(node->text, $2);
      node->next = nullptr;
      $$.last->next = node;
      $$.last = node;
    }
;
text_list_opt :
    /* empty */ { $$.first = $$.last = nullptr; }
  | text_list
;

quoted_text :
    TEXT {
      TextListNode node;
      node.text = $1;
      node.next = nullptr;
      TextList text_list;
      text_list.first = &node;
      text_list.last = &node;
      char* data;
      size_t size;
      dup_text_list(&text_list, &data, &size);
      $$.start = data;
      $$.length = size;
    }
;

/* Types */

value_type_list :
    /* empty */ { $$ = new TypeVector(); }
  | value_type_list VALUE_TYPE {
      $$ = $1;
      $$->push_back($2);
    }
;
elem_type :
    ANYFUNC {}
;
global_type :
    VALUE_TYPE {
      $$ = new Global();
      $$->type = $1;
      $$->mutable_ = false;
    }
  | LPAR MUT VALUE_TYPE RPAR {
      $$ = new Global();
      $$->type = $3;
      $$->mutable_ = true;
    }
;

func_type :
    LPAR FUNC func_sig RPAR { $$ = $3; }
;

func_sig :
    func_sig_result
  | LPAR PARAM value_type_list RPAR func_sig {
      $$ = $5;
      $$->param_types.insert($$->param_types.begin(), $3->begin(), $3->end());
      delete $3;
    }
  | LPAR PARAM bind_var VALUE_TYPE RPAR func_sig {
      $$ = $6;
      $$->param_types.insert($$->param_types.begin(), $4);
      // Ignore bind_var.
      destroy_string_slice(&$3);
    }
;

func_sig_result :
    /* empty */ { $$ = new FuncSignature(); }
  | LPAR RESULT value_type_list RPAR func_sig_result {
      $$ = $5;
      $$->result_types.insert($$->result_types.begin(), $3->begin(), $3->end());
      delete $3;
    }
;

table_sig :
    limits elem_type {
      $$ = new Table();
      $$->elem_limits = $1;
    }
;
memory_sig :
    limits {
      $$ = new Memory();
      $$->page_limits = $1;
    }
;
limits :
    nat {
      $$.has_max = false;
      $$.initial = $1;
      $$.max = 0;
    }
  | nat nat {
      $$.has_max = true;
      $$.initial = $1;
      $$.max = $2;
    }
;
type_use :
    LPAR TYPE var RPAR { $$ = $3; }
;

/* Expressions */

nat :
    NAT {
      if (Failed(parse_uint64($1.text.start,
                              $1.text.start + $1.text.length, &$$))) {
        wast_parser_error(&@1, lexer, parser,
                          "invalid int " PRIstringslice "\"",
                          WABT_PRINTF_STRING_SLICE_ARG($1.text));
      }
    }
;

literal :
    NAT {
      $$.type = $1.type;
      DUPTEXT($$.text, $1.text);
    }
  | INT {
      $$.type = $1.type;
      DUPTEXT($$.text, $1.text);
    }
  | FLOAT {
      $$.type = $1.type;
      DUPTEXT($$.text, $1.text);
    }
;

var :
    nat {
      $$ = new Var($1);
      $$->loc = @1;
    }
  | VAR {
      StringSlice name;
      DUPTEXT(name, $1);
      $$ = new Var(name);
      $$->loc = @1;
    }
;
var_list :
    /* empty */ { $$ = new VarVector(); }
  | var_list var {
      $$ = $1;
      $$->emplace_back(std::move(*$2));
      delete $2;
    }
;
bind_var_opt :
    /* empty */ { ZeroMemory($$); }
  | bind_var
;
bind_var :
    VAR { DUPTEXT($$, $1); }
;

labeling_opt :
    /* empty */ %prec LOW { ZeroMemory($$); }
  | bind_var
;

offset_opt :
    /* empty */ { $$ = 0; }
  | OFFSET_EQ_NAT {
      uint64_t offset64;
      if (Failed(parse_int64($1.start, $1.start + $1.length, &offset64,
                             ParseIntType::SignedAndUnsigned))) {
        wast_parser_error(&@1, lexer, parser,
                          "invalid offset \"" PRIstringslice "\"",
                          WABT_PRINTF_STRING_SLICE_ARG($1));
      }
      if (offset64 > UINT32_MAX) {
        wast_parser_error(&@1, lexer, parser,
                          "offset must be less than or equal to 0xffffffff");
      }
      $$ = static_cast<uint32_t>(offset64);
    }
;
align_opt :
    /* empty */ { $$ = USE_NATURAL_ALIGNMENT; }
  | ALIGN_EQ_NAT {
      if (Failed(parse_int32($1.start, $1.start + $1.length, &$$,
                             ParseIntType::UnsignedOnly))) {
        wast_parser_error(&@1, lexer, parser,
                          "invalid alignment \"" PRIstringslice "\"",
                          WABT_PRINTF_STRING_SLICE_ARG($1));
      }

      if ($$ != WABT_USE_NATURAL_ALIGNMENT && !is_power_of_two($$)) {
        wast_parser_error(&@1, lexer, parser, "alignment must be power-of-two");
      }
    }
;

instr :
    plain_instr {
      $$ = new ExprList($1);
      $$->back().loc = @1;
    }
  | block_instr {
      $$ = new ExprList($1);
      $$->back().loc = @1;
    }
  | expr
;

plain_instr :
    UNREACHABLE {
      $$ = new UnreachableExpr();
    }
  | NOP {
      $$ = new NopExpr();
    }
  | DROP {
      $$ = new DropExpr();
    }
  | SELECT {
      $$ = new SelectExpr();
    }
  | BR var {
      $$ = new BrExpr(std::move(*$2));
      delete $2;
    }
  | BR_IF var {
      $$ = new BrIfExpr(std::move(*$2));
      delete $2;
    }
  | BR_TABLE var_list var {
      $$ = new BrTableExpr($2, std::move(*$3));
      delete $3;
    }
  | RETURN {
      $$ = new ReturnExpr();
    }
  | CALL var {
      $$ = new CallExpr(std::move(*$2));
      delete $2;
    }
  | CALL_INDIRECT var {
      $$ = new CallIndirectExpr(std::move(*$2));
      delete $2;
    }
  | GET_LOCAL var {
      $$ = new GetLocalExpr(std::move(*$2));
      delete $2;
    }
  | SET_LOCAL var {
      $$ = new SetLocalExpr(std::move(*$2));
      delete $2;
    }
  | TEE_LOCAL var {
      $$ = new TeeLocalExpr(std::move(*$2));
      delete $2;
    }
  | GET_GLOBAL var {
      $$ = new GetGlobalExpr(std::move(*$2));
      delete $2;
    }
  | SET_GLOBAL var {
      $$ = new SetGlobalExpr(std::move(*$2));
      delete $2;
    }
  | LOAD offset_opt align_opt {
      $$ = new LoadExpr($1, $3, $2);
    }
  | STORE offset_opt align_opt {
      $$ = new StoreExpr($1, $3, $2);
    }
  | CONST literal {
      Const const_;
      const_.loc = @1;
      if (Failed(parse_const($1, $2.type, $2.text.start,
                             $2.text.start + $2.text.length, &const_))) {
        wast_parser_error(&@2, lexer, parser,
                          "invalid literal \"" PRIstringslice "\"",
                          WABT_PRINTF_STRING_SLICE_ARG($2.text));
      }
      delete [] $2.text.start;
      $$ = new ConstExpr(const_);
    }
  | UNARY {
      $$ = new UnaryExpr($1);
    }
  | BINARY {
      $$ = new BinaryExpr($1);
    }
  | COMPARE {
      $$ = new CompareExpr($1);
    }
  | CONVERT {
      $$ = new ConvertExpr($1);
    }
  | CURRENT_MEMORY {
      $$ = new CurrentMemoryExpr();
    }
  | GROW_MEMORY {
      $$ = new GrowMemoryExpr();
    }
  | throw_check var {
      $$ = new ThrowExpr(std::move(*$2));
      delete $2;
    }
  | rethrow_check var {
      $$ = new RethrowExpr(std::move(*$2));
      delete $2;
    }
;

block_instr :
    BLOCK labeling_opt block END labeling_opt {
      auto expr = new BlockExpr($3);
      expr->block->label = $2;
      CHECK_END_LABEL(@5, expr->block->label, $5);
      $$ = expr;
    }
  | LOOP labeling_opt block END labeling_opt {
      auto expr = new LoopExpr($3);
      expr->block->label = $2;
      CHECK_END_LABEL(@5, expr->block->label, $5);
      $$ = expr;
    }
  | IF labeling_opt block END labeling_opt {
      auto expr = new IfExpr($3);
      expr->true_->label = $2;
      CHECK_END_LABEL(@5, expr->true_->label, $5);
      $$ = expr;
    }
  | IF labeling_opt block ELSE labeling_opt instr_list END labeling_opt {
      auto expr = new IfExpr($3, std::move(*$6));
      delete $6;
      expr->true_->label = $2;
      CHECK_END_LABEL(@5, expr->true_->label, $5);
      CHECK_END_LABEL(@8, expr->true_->label, $8);
      $$ = expr;
    }
  | try_check labeling_opt block catch_instr_list END labeling_opt {
      $3->label = $2;
      $$ = $4;
      cast<TryExpr>($$)->block = $3;
      CHECK_END_LABEL(@6, $3->label, $6);
    }
;

block_sig :
    LPAR RESULT value_type_list RPAR { $$ = $3; }
;
block :
    block_sig block {
      $$ = $2;
      $$->sig.insert($$->sig.end(), $1->begin(), $1->end());
      delete $1;
    }
  | instr_list {
      $$ = new Block(std::move(*$1));
      delete $1;
    }
;

plain_catch :
    CATCH var instr_list {
      $$ = new Catch(std::move(*$2), std::move(*$3));
      delete $2;
      delete $3;
      $$->loc = @1;
    }
  ;
plain_catch_all :
    CATCH_ALL instr_list {
      $$ = new Catch(std::move(*$2));
      delete $2;
      $$->loc = @1;
    }
  ;

catch_instr :
    plain_catch
  | plain_catch_all
  ;

catch_instr_list :
    catch_instr {
      auto expr = new TryExpr();
      expr->catches.push_back($1);
      $$ = expr;
    }
  | catch_instr_list catch_instr {
      $$ = $1;
      cast<TryExpr>($$)->catches.push_back($2);
    }
  ;

expr :
    LPAR expr1 RPAR { $$ = $2; }
;

expr1 :
    plain_instr expr_list {
      $$ = $2;
      $$->push_back($1);
      $1->loc = @1;
    }
  | BLOCK labeling_opt block {
      auto expr = new BlockExpr($3);
      expr->block->label = $2;
      expr->loc = @1;
      $$ = new ExprList(expr);
    }
  | LOOP labeling_opt block {
      auto expr = new LoopExpr($3);
      expr->block->label = $2;
      expr->loc = @1;
      $$ = new ExprList(expr);
    }
  | IF labeling_opt if_block {
      $$ = $3;
      IfExpr* if_ = cast<IfExpr>(&$3->back());
      if_->true_->label = $2;
    }
  | try_check labeling_opt try_ {
      Block* block = $3->block;
      block->label = $2;
      $3->loc = @1;
      $$ = new ExprList($3);
    }
  ;

try_ :
    block_sig try_ {
      $$ = $2;
      Block* block = $$->block;
      block->sig.insert(block->sig.end(), $1->begin(), $1->end());
      delete $1;
    }
  | instr_list catch_sexp_list {
      Block* block = new Block();
      block->exprs = std::move(*$1);
      delete $1;
      $$ = $2;
      $$->block = block;
    }
  ;

catch_sexp :
    LPAR_CATCH LPAR plain_catch RPAR {
      $$ = $3;
    }
  | LPAR_CATCH_ALL LPAR plain_catch_all RPAR {
      $$ = $3;
    }
  ;

catch_sexp_list :
    catch_sexp {
      auto expr = new TryExpr();
      expr->catches.push_back($1);
      $$ = expr;
    }
  | catch_sexp_list catch_sexp {
      $$ = $1;
      cast<TryExpr>($$)->catches.push_back($2);
    }
  ;


if_block :
    block_sig if_block {
      IfExpr* if_ = cast<IfExpr>(&$2->back());
      $$ = $2;
      Block* true_ = if_->true_;
      true_->sig.insert(true_->sig.end(), $1->begin(), $1->end());
      delete $1;
    }
  | if_
;
if_ :
    LPAR THEN instr_list RPAR LPAR ELSE instr_list RPAR {
      Expr* expr = new IfExpr(new Block(std::move(*$3)), std::move(*$7));
      delete $3;
      delete $7;
      expr->loc = @1;
      $$ = new ExprList(expr);
    }
  | LPAR THEN instr_list RPAR {
      Expr* expr = new IfExpr(new Block(std::move(*$3)));
      delete $3;
      expr->loc = @1;
      $$ = new ExprList(expr);
    }
  | expr LPAR THEN instr_list RPAR LPAR ELSE instr_list RPAR {
      Expr* expr = new IfExpr(new Block(std::move(*$4)), std::move(*$8));
      delete $4;
      delete $8;
      expr->loc = @1;
      $$ = $1;
      $$->push_back(expr);
    }
  | expr LPAR THEN instr_list RPAR {
      Expr* expr = new IfExpr(new Block(std::move(*$4)));
      delete $4;
      expr->loc = @1;
      $$ = $1;
      $$->push_back(expr);
    }
  | expr expr expr {
      Expr* expr = new IfExpr(new Block(std::move(*$2)), std::move(*$3));
      delete $2;
      delete $3;
      expr->loc = @1;
      $$ = $1;
      $$->push_back(expr);
    }
  | expr expr {
      Expr* expr = new IfExpr(new Block(std::move(*$2)));
      delete $2;
      expr->loc = @1;
      $$ = $1;
      $$->push_back(expr);
    }
;

rethrow_check :
    RETHROW {
     CHECK_ALLOW_EXCEPTIONS(&@1, "rethrow");
    }
  ;
throw_check :
    THROW {
      CHECK_ALLOW_EXCEPTIONS(&@1, "throw");
    }
  ;

try_check :
    TRY {
      CHECK_ALLOW_EXCEPTIONS(&@1, "try");
    }
  ;

instr_list :
    /* empty */ { $$ = new ExprList(); }
  | instr instr_list {
      $$ = $2;
      $$->splice($$->begin(), std::move(*$1));
      delete $1;
    }
;
expr_list :
    /* empty */ { $$ = new ExprList(); }
  | expr expr_list {
      $$ = $2;
      $$->splice($$->begin(), std::move(*$1));
      delete $1;
    }

const_expr :
    instr_list
;

/* Exceptions */
exception :
    LPAR EXCEPT bind_var_opt value_type_list RPAR {
      $$ = new Exception($3, *$4);
      delete $4;
    }
  ;
exception_field :
    exception {
      $$ = new ExceptionModuleField($1);
    }
  ;

/* Functions */
func :
    LPAR FUNC bind_var_opt func_fields RPAR {
      $$ = $4;
      ModuleField* main_field = $$.first;
      main_field->loc = @2;
      if (auto func_field = dyn_cast<FuncModuleField>(main_field)) {
        func_field->func->name = $3;
      } else {
        cast<ImportModuleField>(main_field)->import->func->name = $3;
      }
    }
;

func_fields :
    type_use func_fields_body {
      auto field = new FuncModuleField($2);
      field->func->decl.has_func_type = true;
      field->func->decl.type_var = std::move(*$1);
      delete $1;
      $$.first = $$.last = field;
    }
  | func_fields_body {
      auto field = new FuncModuleField($1);
      $$.first = $$.last = field;
    }
  | inline_import type_use func_fields_import {
      auto field = new ImportModuleField($1, @1);
      field->import->kind = ExternalKind::Func;
      field->import->func = $3;
      field->import->func->decl.has_func_type = true;
      field->import->func->decl.type_var = std::move(*$2);
      delete $2;
      $$.first = $$.last = field;
    }
  | inline_import func_fields_import {
      auto field = new ImportModuleField($1, @1);
      field->import->kind = ExternalKind::Func;
      field->import->func = $2;
      $$.first = $$.last = field;
    }
  | inline_export func_fields {
      auto field = new ExportModuleField($1, @1);
      field->export_->kind = ExternalKind::Func;
      $$.first = $2.first;
      $$.last = $2.last->next = field;
    }
;

func_fields_import :
    func_fields_import1 {
      $$ = $1;
      reverse_bindings(&$$->decl.sig.param_types, &$$->param_bindings);
    }
;

func_fields_import1 :
    func_fields_import_result
  | LPAR PARAM value_type_list RPAR func_fields_import1 {
      $$ = $5;
      $$->decl.sig.param_types.insert($$->decl.sig.param_types.begin(),
                                      $3->begin(), $3->end());
      delete $3;
    }
  | LPAR PARAM bind_var VALUE_TYPE RPAR func_fields_import1 {
      $$ = $6;
      $$->param_bindings.emplace(string_slice_to_string($3),
                                 Binding(@3, $$->decl.sig.param_types.size()));
      destroy_string_slice(&$3);
      $$->decl.sig.param_types.insert($$->decl.sig.param_types.begin(), $4);
    }
;

func_fields_import_result :
    /* empty */ { $$ = new Func(); }
  | LPAR RESULT value_type_list RPAR func_fields_import_result {
      $$ = $5;
      $$->decl.sig.result_types.insert($$->decl.sig.result_types.begin(),
                                       $3->begin(), $3->end());
      delete $3;
    }
;

func_fields_body :
    func_fields_body1 {
      $$ = $1;
      reverse_bindings(&$$->decl.sig.param_types, &$$->param_bindings);
    }
;

func_fields_body1 :
    func_result_body
  | LPAR PARAM value_type_list RPAR func_fields_body1 {
      $$ = $5;
      $$->decl.sig.param_types.insert($$->decl.sig.param_types.begin(),
                                      $3->begin(), $3->end());
      delete $3;
    }
  | LPAR PARAM bind_var VALUE_TYPE RPAR func_fields_body1 {
      $$ = $6;
      $$->param_bindings.emplace(string_slice_to_string($3),
                                 Binding(@3, $$->decl.sig.param_types.size()));
      destroy_string_slice(&$3);
      $$->decl.sig.param_types.insert($$->decl.sig.param_types.begin(), $4);
    }
;

func_result_body :
    func_body
  | LPAR RESULT value_type_list RPAR func_result_body {
      $$ = $5;
      $$->decl.sig.result_types.insert($$->decl.sig.result_types.begin(),
                                       $3->begin(), $3->end());
      delete $3;
    }
;

func_body :
    func_body1 {
      $$ = $1;
      reverse_bindings(&$$->local_types, &$$->local_bindings);
    }
;

func_body1 :
    instr_list {
      $$ = new Func();
      $$->exprs = std::move(*$1);
      delete $1;
    }
  | LPAR LOCAL value_type_list RPAR func_body1 {
      $$ = $5;
      $$->local_types.insert($$->local_types.begin(), $3->begin(), $3->end());
      delete $3;
    }
  | LPAR LOCAL bind_var VALUE_TYPE RPAR func_body1 {
      $$ = $6;
      $$->local_bindings.emplace(string_slice_to_string($3),
                                 Binding(@3, $$->local_types.size()));
      destroy_string_slice(&$3);
      $$->local_types.insert($$->local_types.begin(), $4);
    }
;

/* Tables & Memories */

offset :
    LPAR OFFSET const_expr RPAR {
      $$ = $3;
    }
  | expr
;

elem :
    LPAR ELEM var offset var_list RPAR {
      auto elem_segment = new ElemSegment();
      elem_segment->table_var = std::move(*$3);
      delete $3;
      elem_segment->offset = std::move(*$4);
      delete $4;
      elem_segment->vars = std::move(*$5);
      delete $5;
      $$ = new ElemSegmentModuleField(elem_segment, @2);
    }
  | LPAR ELEM offset var_list RPAR {
      auto elem_segment = new ElemSegment();
      elem_segment->table_var.loc = @2;
      elem_segment->table_var.type = VarType::Index;
      elem_segment->table_var.index = 0;
      elem_segment->offset = std::move(*$3);
      delete $3;
      elem_segment->vars = std::move(*$4);
      delete $4;
      $$ = new ElemSegmentModuleField(elem_segment, @2);
    }
;

table :
    LPAR TABLE bind_var_opt table_fields RPAR {
      $$ = $4;
      ModuleField* main_field = $$.first;
      main_field->loc = @2;
      if (auto table_field = dyn_cast<TableModuleField>(main_field)) {
        table_field->table->name = $3;
      } else {
        cast<ImportModuleField>(main_field)->import->table->name = $3;
      }
    }
;

table_fields :
    table_sig {
      auto field = new TableModuleField($1);
      $$.first = $$.last = field;
    }
  | inline_import table_sig {
      auto field = new ImportModuleField($1);
      field->import->kind = ExternalKind::Table;
      field->import->table = $2;
      $$.first = $$.last = field;
    }
  | inline_export table_fields {
      auto field = new ExportModuleField($1, @1);
      field->export_->kind = ExternalKind::Table;
      $$.first = $2.first;
      $$.last = $2.last->next = field;
    }
  | elem_type LPAR ELEM var_list RPAR {
      auto table = new Table();
      table->elem_limits.initial = $4->size();
      table->elem_limits.max = $4->size();
      table->elem_limits.has_max = true;
      auto table_field = new TableModuleField(table);

      auto elem_segment = new ElemSegment();
      elem_segment->table_var = Var(kInvalidIndex);
      elem_segment->offset.push_back(new ConstExpr(Const(Const::I32(), 0)));
      elem_segment->offset.back().loc = @3;
      elem_segment->vars = std::move(*$4);
      delete $4;
      auto elem_field = new ElemSegmentModuleField(elem_segment, @3);
      $$.first = table_field;
      $$.last = table_field->next = elem_field;
    }
;

data :
    LPAR DATA var offset text_list_opt RPAR {
      auto data_segment = new DataSegment();
      data_segment->memory_var = std::move(*$3);
      delete $3;
      data_segment->offset = std::move(*$4);
      delete $4;
      dup_text_list(&$5, &data_segment->data, &data_segment->size);
      destroy_text_list(&$5);
      $$ = new DataSegmentModuleField(data_segment, @2);
    }
  | LPAR DATA offset text_list_opt RPAR {
      auto data_segment = new DataSegment();
      data_segment->memory_var.loc = @2;
      data_segment->memory_var.type = VarType::Index;
      data_segment->memory_var.index = 0;
      data_segment->offset = std::move(*$3);
      delete $3;
      dup_text_list(&$4, &data_segment->data, &data_segment->size);
      destroy_text_list(&$4);
      $$ = new DataSegmentModuleField(data_segment, @2);
    }
;

memory :
    LPAR MEMORY bind_var_opt memory_fields RPAR {
      $$ = $4;
      ModuleField* main_field = $$.first;
      main_field->loc = @2;
      if (auto memory_field = dyn_cast<MemoryModuleField>(main_field)) {
        memory_field->memory->name = $3;
      } else {
        cast<ImportModuleField>(main_field)->import->memory->name = $3;
      }
    }
;

memory_fields :
    memory_sig {
      auto field = new MemoryModuleField($1);
      $$.first = $$.last = field;
    }
  | inline_import memory_sig {
      auto field = new ImportModuleField($1);
      field->import->kind = ExternalKind::Memory;
      field->import->memory = $2;
      $$.first = $$.last = field;
    }
  | inline_export memory_fields {
      auto field = new ExportModuleField($1, @1);
      field->export_->kind = ExternalKind::Memory;
      $$.first = $2.first;
      $$.last = $2.last->next = field;
    }
  | LPAR DATA text_list_opt RPAR {
      auto data_segment = new DataSegment();
      data_segment->memory_var = Var(kInvalidIndex);
      data_segment->offset.push_back(new ConstExpr(Const(Const::I32(), 0)));
      data_segment->offset.back().loc = @2;
      dup_text_list(&$3, &data_segment->data, &data_segment->size);
      destroy_text_list(&$3);
      auto data_field = new DataSegmentModuleField(data_segment, @2);

      uint32_t byte_size = WABT_ALIGN_UP_TO_PAGE(data_segment->size);
      uint32_t page_size = WABT_BYTES_TO_PAGES(byte_size);

      auto memory = new Memory();
      memory->page_limits.initial = page_size;
      memory->page_limits.max = page_size;
      memory->page_limits.has_max = true;
      auto memory_field = new MemoryModuleField(memory);
      $$.first = memory_field;
      $$.last = memory_field->next = data_field;
    }
;

global :
    LPAR GLOBAL bind_var_opt global_fields RPAR {
      $$ = $4;
      ModuleField* main_field = $$.first;
      main_field->loc = @2;
      if (auto global_field = dyn_cast<GlobalModuleField>(main_field)) {
        global_field->global->name = $3;
      } else {
        cast<ImportModuleField>(main_field)->import->global->name = $3;
      }
    }
;

global_fields :
    global_type const_expr {
      auto field = new GlobalModuleField($1);
      field->global->init_expr = std::move(*$2);
      delete $2;
      $$.first = $$.last = field;
    }
  | inline_import global_type {
      auto field = new ImportModuleField($1);
      field->import->kind = ExternalKind::Global;
      field->import->global = $2;
      $$.first = $$.last = field;
    }
  | inline_export global_fields {
      auto field = new ExportModuleField($1, @1);
      field->export_->kind = ExternalKind::Global;
      $$.first = $2.first;
      $$.last = $2.last->next = field;
    }
;

/* Imports & Exports */

import_desc :
    LPAR FUNC bind_var_opt type_use RPAR {
      $$ = new Import();
      $$->kind = ExternalKind::Func;
      $$->func = new Func();
      $$->func->name = $3;
      $$->func->decl.has_func_type = true;
      $$->func->decl.type_var = std::move(*$4);
      delete $4;
    }
  | LPAR FUNC bind_var_opt func_sig RPAR {
      $$ = new Import();
      $$->kind = ExternalKind::Func;
      $$->func = new Func();
      $$->func->name = $3;
      $$->func->decl.sig = std::move(*$4);
      delete $4;
    }
  | LPAR TABLE bind_var_opt table_sig RPAR {
      $$ = new Import();
      $$->kind = ExternalKind::Table;
      $$->table = $4;
      $$->table->name = $3;
    }
  | LPAR MEMORY bind_var_opt memory_sig RPAR {
      $$ = new Import();
      $$->kind = ExternalKind::Memory;
      $$->memory = $4;
      $$->memory->name = $3;
    }
  | LPAR GLOBAL bind_var_opt global_type RPAR {
      $$ = new Import();
      $$->kind = ExternalKind::Global;
      $$->global = $4;
      $$->global->name = $3;
    }
  | exception {
      $$ = new Import();
      $$->kind = ExternalKind::Except;
      $$->except = $1;
    }
;

import :
    LPAR IMPORT quoted_text quoted_text import_desc RPAR {
      auto field = new ImportModuleField($5, @2);
      field->import->module_name = $3;
      field->import->field_name = $4;
      $$ = field;
    }
;

inline_import :
    LPAR IMPORT quoted_text quoted_text RPAR {
      $$ = new Import();
      $$->module_name = $3;
      $$->field_name = $4;
    }
;

export_desc :
    LPAR FUNC var RPAR {
      $$ = new Export();
      $$->kind = ExternalKind::Func;
      $$->var = std::move(*$3);
      delete $3;
    }
  | LPAR TABLE var RPAR {
      $$ = new Export();
      $$->kind = ExternalKind::Table;
      $$->var = std::move(*$3);
      delete $3;
    }
  | LPAR MEMORY var RPAR {
      $$ = new Export();
      $$->kind = ExternalKind::Memory;
      $$->var = std::move(*$3);
      delete $3;
    }
  | LPAR GLOBAL var RPAR {
      $$ = new Export();
      $$->kind = ExternalKind::Global;
      $$->var = std::move(*$3);
      delete $3;
    }
  | LPAR EXCEPT var RPAR {
      $$ = new Export();
      $$->kind = ExternalKind::Except;
      $$->var = std::move(*$3);
      delete $3;
    }
;
export :
    LPAR EXPORT quoted_text export_desc RPAR {
      auto field = new ExportModuleField($4, @2);
      field->export_->name = $3;
      $$ = field;
    }
;

inline_export :
    LPAR EXPORT quoted_text RPAR {
      $$ = new Export();
      $$->name = $3;
    }
;


/* Modules */

type_def :
    LPAR TYPE func_type RPAR {
      auto func_type = new FuncType();
      func_type->sig = std::move(*$3);
      delete $3;
      $$ = new FuncTypeModuleField(func_type, @2);
    }
  | LPAR TYPE bind_var func_type RPAR {
      auto func_type = new FuncType();
      func_type->name = $3;
      func_type->sig = std::move(*$4);
      delete $4;
      $$ = new FuncTypeModuleField(func_type, @2);
    }
;

start :
    LPAR START var RPAR {
      $$ = new StartModuleField(*$3, @2);
      delete $3;
    }
;

module_field :
    type_def { $$.first = $$.last = $1; }
  | global
  | table
  | memory
  | func
  | elem { $$.first = $$.last = $1; }
  | data { $$.first = $$.last = $1; }
  | start { $$.first = $$.last = $1; }
  | import { $$.first = $$.last = $1; }
  | export { $$.first = $$.last = $1; }
  | exception_field { $$.first = $$.last = $1; }
;

module_fields_opt :
    /* empty */ { $$ = new Module(); }
  | module_fields
;

module_fields :
    module_field {
      $$ = new Module();
      check_import_ordering(&@1, lexer, parser, $$, $1.first);
      append_module_fields($$, $1.first);
    }
  | module_fields module_field {
      $$ = $1;
      check_import_ordering(&@2, lexer, parser, $$, $2.first);
      append_module_fields($$, $2.first);
    }
;

module :
    script_module {
      if ($1->type == ScriptModule::Type::Text) {
        $$ = $1->text;
        $1->text = nullptr;
      } else {
        assert($1->type == ScriptModule::Type::Binary);
        $$ = new Module();
        ReadBinaryOptions options;
        BinaryErrorHandlerModule error_handler(&$1->binary.loc, lexer, parser);
        const char* filename = "<text>";
        read_binary_ir(filename, $1->binary.data, $1->binary.size, &options,
                       &error_handler, $$);
        $$->name = $1->binary.name;
        $$->loc = $1->binary.loc;
        ZeroMemory($1->binary.name);
      }
      delete $1;
    }
;

inline_module :
    module_fields
;


/* Scripts */

script_var_opt :
    /* empty */ {
      $$ = new Var(kInvalidIndex);
    }
  | VAR {
      StringSlice name;
      DUPTEXT(name, $1);
      $$ = new Var(name);
    }
;

script_module :
    LPAR MODULE bind_var_opt module_fields_opt RPAR {
      $$ = new ScriptModule();
      $$->type = ScriptModule::Type::Text;
      $$->text = $4;
      $$->text->name = $3;
      $$->text->loc = @2;

      // Resolve func type variables where the signature was not specified
      // explicitly.
      for (Func* func: $4->funcs) {
        if (func->decl.has_func_type && is_empty_signature(&func->decl.sig)) {
          FuncType* func_type = $4->GetFuncType(func->decl.type_var);
          if (func_type) {
            func->decl.sig = func_type->sig;
          }
        }
      }
    }
  | LPAR MODULE bind_var_opt BIN text_list RPAR {
      $$ = new ScriptModule();
      $$->type = ScriptModule::Type::Binary;
      $$->binary.name = $3;
      $$->binary.loc = @2;
      dup_text_list(&$5, &$$->binary.data, &$$->binary.size);
      destroy_text_list(&$5);
    }
  | LPAR MODULE bind_var_opt QUOTE text_list RPAR {
      $$ = new ScriptModule();
      $$->type = ScriptModule::Type::Quoted;
      $$->quoted.name = $3;
      $$->quoted.loc = @2;
      dup_text_list(&$5, &$$->quoted.data, &$$->quoted.size);
      destroy_text_list(&$5);
    }
;

action :
    LPAR INVOKE script_var_opt quoted_text const_list RPAR {
      $$ = new Action();
      $$->loc = @2;
      $$->module_var = std::move(*$3);
      delete $3;
      $$->type = ActionType::Invoke;
      $$->name = $4;
      $$->invoke = new ActionInvoke();
      $$->invoke->args = std::move(*$5);
      delete $5;
    }
  | LPAR GET script_var_opt quoted_text RPAR {
      $$ = new Action();
      $$->loc = @2;
      $$->module_var = std::move(*$3);
      delete $3;
      $$->type = ActionType::Get;
      $$->name = $4;
    }
;

assertion :
    LPAR ASSERT_MALFORMED script_module quoted_text RPAR {
      $$ = new AssertMalformedCommand($3, $4);
    }
  | LPAR ASSERT_INVALID script_module quoted_text RPAR {
      $$ = new AssertInvalidCommand($3, $4);
    }
  | LPAR ASSERT_UNLINKABLE script_module quoted_text RPAR {
      $$ = new AssertUnlinkableCommand($3, $4);
    }
  | LPAR ASSERT_TRAP script_module quoted_text RPAR {
      $$ = new AssertUninstantiableCommand($3, $4);
    }
  | LPAR ASSERT_RETURN action const_list RPAR {
      $$ = new AssertReturnCommand($3, $4);
    }
  | LPAR ASSERT_RETURN_CANONICAL_NAN action RPAR {
      $$ = new AssertReturnCanonicalNanCommand($3);
    }
  | LPAR ASSERT_RETURN_ARITHMETIC_NAN action RPAR {
      $$ = new AssertReturnArithmeticNanCommand($3);
    }
  | LPAR ASSERT_TRAP action quoted_text RPAR {
      $$ = new AssertTrapCommand($3, $4);
    }
  | LPAR ASSERT_EXHAUSTION action quoted_text RPAR {
      $$ = new AssertExhaustionCommand($3, $4);
    }
;

cmd :
    action {
      $$ = new ActionCommand($1);
    }
  | assertion
  | module {
      $$ = new ModuleCommand($1);
    }
  | LPAR REGISTER quoted_text script_var_opt RPAR {
      auto* command = new RegisterCommand($3, *$4);
      delete $4;
      command->var.loc = @4;
      $$ = command;
    }
;
cmd_list :
    cmd {
      $$ = new CommandPtrVector();
      $$->emplace_back($1);
    }
  | cmd_list cmd {
      $$ = $1;
      $$->emplace_back($2);
    }
;

const :
    LPAR CONST literal RPAR {
      $$.loc = @2;
      if (Failed(parse_const($2, $3.type, $3.text.start,
                             $3.text.start + $3.text.length, &$$))) {
        wast_parser_error(&@3, lexer, parser,
                          "invalid literal \"" PRIstringslice "\"",
                          WABT_PRINTF_STRING_SLICE_ARG($3.text));
      }
      delete [] $3.text.start;
    }
;
const_list :
    /* empty */ { $$ = new ConstVector(); }
  | const_list const {
      $$ = $1;
      $$->push_back($2);
    }
;

script :
    /* empty */ {
      $$ = new Script();
    }
  | cmd_list {
      $$ = new Script();
      $$->commands = std::move(*$1);
      delete $1;

      int last_module_index = -1;
      for (size_t i = 0; i < $$->commands.size(); ++i) {
        Command* command = $$->commands[i].get();
        Var* module_var = nullptr;
        switch (command->type) {
          case CommandType::Module: {
            last_module_index = i;

            // Wire up module name bindings.
            Module* module = cast<ModuleCommand>(command)->module;
            if (module->name.length == 0)
              continue;

            $$->module_bindings.emplace(string_slice_to_string(module->name),
                                        Binding(module->loc, i));
            break;
          }

          case CommandType::AssertReturn:
            module_var =
                &cast<AssertReturnCommand>(command)->action->module_var;
            goto has_module_var;
          case CommandType::AssertReturnCanonicalNan:
            module_var = &cast<AssertReturnCanonicalNanCommand>(command)
                              ->action->module_var;
            goto has_module_var;
          case CommandType::AssertReturnArithmeticNan:
            module_var = &cast<AssertReturnArithmeticNanCommand>(command)
                              ->action->module_var;
            goto has_module_var;
          case CommandType::AssertTrap:
            module_var = &cast<AssertTrapCommand>(command)->action->module_var;
            goto has_module_var;
          case CommandType::AssertExhaustion:
            module_var =
                &cast<AssertExhaustionCommand>(command)->action->module_var;
            goto has_module_var;
          case CommandType::Action:
            module_var = &cast<ActionCommand>(command)->action->module_var;
            goto has_module_var;
          case CommandType::Register:
            module_var = &cast<RegisterCommand>(command)->var;
            goto has_module_var;

          has_module_var: {
            /* Resolve actions with an invalid index to use the preceding
             * module. */
            if (module_var->type == VarType::Index &&
                module_var->index == kInvalidIndex) {
              module_var->index = last_module_index;
            }
            break;
          }

          default:
            break;
        }
      }
    }
  | inline_module {
      $$ = new Script();
      $$->commands.emplace_back(new ModuleCommand($1));
    }
;

/* bison destroys the start symbol even on a successful parse. We want to keep
 script from being destroyed, so create a dummy start symbol. */
script_start :
    script { parser->script = $1; }
;

%%

Result parse_const(Type type,
                   LiteralType literal_type,
                   const char* s,
                   const char* end,
                   Const* out) {
  out->type = type;
  switch (type) {
    case Type::I32:
      return parse_int32(s, end, &out->u32, ParseIntType::SignedAndUnsigned);
    case Type::I64:
      return parse_int64(s, end, &out->u64, ParseIntType::SignedAndUnsigned);
    case Type::F32:
      return parse_float(literal_type, s, end, &out->f32_bits);
    case Type::F64:
      return parse_double(literal_type, s, end, &out->f64_bits);
    default:
      assert(0);
      break;
  }
  return Result::Error;
}

size_t copy_string_contents(StringSlice* text, char* dest) {
  const char* src = text->start + 1;
  const char* end = text->start + text->length - 1;

  char* dest_start = dest;

  while (src < end) {
    if (*src == '\\') {
      src++;
      switch (*src) {
        case 'n':
          *dest++ = '\n';
          break;
        case 'r':
          *dest++ = '\r';
          break;
        case 't':
          *dest++ = '\t';
          break;
        case '\\':
          *dest++ = '\\';
          break;
        case '\'':
          *dest++ = '\'';
          break;
        case '\"':
          *dest++ = '\"';
          break;
        default: {
          // The string should be validated already, so we know this is a hex
          // sequence.
          uint32_t hi;
          uint32_t lo;
          if (Succeeded(parse_hexdigit(src[0], &hi)) &&
              Succeeded(parse_hexdigit(src[1], &lo))) {
            *dest++ = (hi << 4) | lo;
          } else {
            assert(0);
          }
          src++;
          break;
        }
      }
      src++;
    } else {
      *dest++ = *src++;
    }
  }
  /* return the data length */
  return dest - dest_start;
}

void dup_text_list(TextList* text_list, char** out_data, size_t* out_size) {
  /* walk the linked list to see how much total space is needed */
  size_t total_size = 0;
  for (TextListNode* node = text_list->first; node; node = node->next) {
    /* Always allocate enough space for the entire string including the escape
     * characters. It will only get shorter, and this way we only have to
     * iterate through the string once. */
    const char* src = node->text.start + 1;
    const char* end = node->text.start + node->text.length - 1;
    size_t size = (end > src) ? (end - src) : 0;
    total_size += size;
  }
  char* result = new char [total_size];
  char* dest = result;
  for (TextListNode* node = text_list->first; node; node = node->next) {
    size_t actual_size = copy_string_contents(&node->text, dest);
    dest += actual_size;
  }
  *out_data = result;
  *out_size = dest - result;
}

void reverse_bindings(TypeVector* types, BindingHash* bindings) {
  for (auto& pair : *bindings) {
    pair.second.index = types->size() - pair.second.index - 1;
  }
}

bool is_empty_signature(const FuncSignature* sig) {
  return sig->result_types.empty() && sig->param_types.empty();
}

void append_implicit_func_declaration(Location* loc,
                                      Module* module,
                                      FuncDeclaration* decl) {
  if (decl->has_func_type)
    return;

  int sig_index = module->GetFuncTypeIndex(*decl);
  if (sig_index == -1) {
    module->AppendImplicitFuncType(*loc, decl->sig);
  } else {
    decl->sig = module->func_types[sig_index]->sig;
  }
}

void check_import_ordering(Location* loc, WastLexer* lexer, WastParser* parser,
                           Module* module, ModuleField* first) {
  for (ModuleField* field = first; field; field = field->next) {
    if (field->type == ModuleFieldType::Import) {
      if (module->funcs.size() != module->num_func_imports ||
          module->tables.size() != module->num_table_imports ||
          module->memories.size() != module->num_memory_imports ||
          module->globals.size() != module->num_global_imports ||
          module->excepts.size() != module->num_except_imports) {
        wast_parser_error(
            loc, lexer, parser,
            "imports must occur before all non-import definitions");
      }
    }
  }
}

void append_module_fields(Module* module, ModuleField* first) {
  ModuleField* main_field = first;
  Index main_index = kInvalidIndex;

  for (ModuleField* field = first; field; field = field->next) {
    StringSlice* name = nullptr;
    BindingHash* bindings = nullptr;
    Index index = kInvalidIndex;

    switch (field->type) {
      case ModuleFieldType::Func: {
        Func* func = cast<FuncModuleField>(field)->func;
        append_implicit_func_declaration(&field->loc, module, &func->decl);
        name = &func->name;
        bindings = &module->func_bindings;
        index = module->funcs.size();
        module->funcs.push_back(func);
        break;
      }

      case ModuleFieldType::Global: {
        Global* global = cast<GlobalModuleField>(field)->global;
        name = &global->name;
        bindings = &module->global_bindings;
        index = module->globals.size();
        module->globals.push_back(global);
        break;
      }

      case ModuleFieldType::Import: {
        Import* import = cast<ImportModuleField>(field)->import;

        switch (import->kind) {
          case ExternalKind::Func:
            append_implicit_func_declaration(&field->loc, module,
                                             &import->func->decl);
            name = &import->func->name;
            bindings = &module->func_bindings;
            index = module->funcs.size();
            module->funcs.push_back(import->func);
            ++module->num_func_imports;
            break;
          case ExternalKind::Table:
            name = &import->table->name;
            bindings = &module->table_bindings;
            index = module->tables.size();
            module->tables.push_back(import->table);
            ++module->num_table_imports;
            break;
          case ExternalKind::Memory:
            name = &import->memory->name;
            bindings = &module->memory_bindings;
            index = module->memories.size();
            module->memories.push_back(import->memory);
            ++module->num_memory_imports;
            break;
          case ExternalKind::Global:
            name = &import->global->name;
            bindings = &module->global_bindings;
            index = module->globals.size();
            module->globals.push_back(import->global);
            ++module->num_global_imports;
            break;
          case ExternalKind::Except:
            name = &import->except->name;
            bindings = &module->except_bindings;
            index = module->excepts.size();
            module->excepts.push_back(import->except);
            ++module->num_except_imports;
            break;
        }
        module->imports.push_back(import);
        break;
      }

      case ModuleFieldType::Export: {
        Export* export_ = cast<ExportModuleField>(field)->export_;
        if (field != main_field) {
          // If this is not the main field, it must be an inline export.
          export_->var.type = VarType::Index;
          export_->var.index = main_index;
        }
        name = &export_->name;
        bindings = &module->export_bindings;
        index = module->exports.size();
        module->exports.push_back(export_);
        break;
      }

      case ModuleFieldType::FuncType: {
        FuncType* func_type = cast<FuncTypeModuleField>(field)->func_type;
        name = &func_type->name;
        bindings = &module->func_type_bindings;
        index = module->func_types.size();
        module->func_types.push_back(func_type);
        break;
      }

      case ModuleFieldType::Table: {
        Table* table = cast<TableModuleField>(field)->table;
        name = &table->name;
        bindings = &module->table_bindings;
        index = module->tables.size();
        module->tables.push_back(table);
        break;
      }

      case ModuleFieldType::ElemSegment: {
        ElemSegment* elem_segment =
            cast<ElemSegmentModuleField>(field)->elem_segment;
        if (field != main_field) {
          // If this is not the main field, it must be an inline elem segment.
          elem_segment->table_var.type = VarType::Index;
          elem_segment->table_var.index = main_index;
        }
        module->elem_segments.push_back(elem_segment);
        break;
      }

      case ModuleFieldType::Memory: {
        Memory* memory = cast<MemoryModuleField>(field)->memory;
        name = &memory->name;
        bindings = &module->memory_bindings;
        index = module->memories.size();
        module->memories.push_back(memory);
        break;
      }

      case ModuleFieldType::DataSegment: {
        DataSegment* data_segment =
            cast<DataSegmentModuleField>(field)->data_segment;
        if (field != main_field) {
          // If this is not the main field, it must be an inline data segment.
          data_segment->memory_var.type = VarType::Index;
          data_segment->memory_var.index = main_index;
        }
        module->data_segments.push_back(data_segment);
        break;
      }

      case ModuleFieldType::Except: {
        Exception* except = cast<ExceptionModuleField>(field)->except;
        name = &except->name;
        bindings = &module->except_bindings;
        index = module->excepts.size();
        module->excepts.push_back(except);
        break;
      }

      case ModuleFieldType::Start:
        module->start = &cast<StartModuleField>(field)->start;
        break;
    }

    if (field == main_field)
      main_index = index;

    if (module->last_field)
      module->last_field->next = field;
    else
      module->first_field = field;
    module->last_field = field;

    if (name && bindings) {
      // Exported names are allowed to be empty; other names aren't.
      if (bindings == &module->export_bindings ||
          !string_slice_is_empty(name)) {
        bindings->emplace(string_slice_to_string(*name),
                          Binding(field->loc, index));
      }
    }
  }
}

Result parse_wast(WastLexer* lexer, Script** out_script,
                  SourceErrorHandler* error_handler,
                  WastParseOptions* options) {
  WastParser parser;
  ZeroMemory(parser);
  static WastParseOptions default_options;
  if (options == nullptr)
    options = &default_options;
  parser.options = options;
  parser.error_handler = error_handler;
  wabt_wast_parser_debug = int(options->debug_parsing);
  int result = wabt_wast_parser_parse(lexer, &parser);
  delete [] parser.yyssa;
  delete [] parser.yyvsa;
  delete [] parser.yylsa;
  if (out_script) {
    *out_script = parser.script;
  } else {
    delete parser.script;
  }
  return result == 0 && parser.errors == 0 ? Result::Ok : Result::Error;
}

BinaryErrorHandlerModule::BinaryErrorHandlerModule(
    Location* loc, WastLexer* lexer, WastParser* parser)
  : loc_(loc), lexer_(lexer), parser_(parser) {}

bool BinaryErrorHandlerModule::OnError(Offset offset,
                                       const std::string& error) {
  if (offset == kInvalidOffset) {
    wast_parser_error(loc_, lexer_, parser_, "error in binary module: %s",
                      error.c_str());
  } else {
    wast_parser_error(loc_, lexer_, parser_,
                      "error in binary module: @0x%08" PRIzx ": %s", offset,
                      error.c_str());
  }
  return true;
}

}  // namespace wabt
