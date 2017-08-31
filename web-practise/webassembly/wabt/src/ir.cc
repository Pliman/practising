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

#include "ir.h"

#include <cassert>
#include <cstddef>

#include "cast.h"

namespace {

const char* ExprTypeName[] = {
  "Binary",
  "Block",
  "Br",
  "BrIf",
  "BrTable",
  "Call",
  "CallIndirect",
  "Compare",
  "Const",
  "Convert",
  "CurrentMemory",
  "Drop",
  "GetGlobal",
  "GetLocal",
  "GrowMemory",
  "If",
  "Load",
  "Loop",
  "Nop",
  "Rethrow",
  "Return",
  "Select",
  "SetGlobal",
  "SetLocal",
  "Store",
  "TeeLocal",
  "Throw",
  "TryBlock",
  "Unary",
  "Unreachable"
};

}  // end of anonymous namespace

namespace wabt {

const char* GetExprTypeName(ExprType type) {
  static_assert(WABT_ENUM_COUNT(ExprType) == WABT_ARRAY_SIZE(ExprTypeName),
                "Malformed ExprTypeName array");
  return ExprTypeName[size_t(type)];
}

const char* GetExprTypeName(const Expr& expr) {
  return GetExprTypeName(expr.type);
}

bool FuncSignature::operator==(const FuncSignature& rhs) const {
  return param_types == rhs.param_types && result_types == rhs.result_types;
}

const Export* Module::GetExport(const StringSlice& name) const {
  Index index = export_bindings.FindIndex(name);
  if (index >= exports.size())
    return nullptr;
  return exports[index];
}

Index Module::GetFuncIndex(const Var& var) const {
  return func_bindings.FindIndex(var);
}

Index Module::GetGlobalIndex(const Var& var) const {
  return global_bindings.FindIndex(var);
}

Index Module::GetTableIndex(const Var& var) const {
  return table_bindings.FindIndex(var);
}

Index Module::GetMemoryIndex(const Var& var) const {
  return memory_bindings.FindIndex(var);
}

Index Module::GetFuncTypeIndex(const Var& var) const {
  return func_type_bindings.FindIndex(var);
}

Index Module::GetExceptIndex(const Var& var) const {
  return except_bindings.FindIndex(var);
}

Index Func::GetLocalIndex(const Var& var) const {
  if (var.type == VarType::Index)
    return var.index;

  Index result = param_bindings.FindIndex(var.name);
  if (result != kInvalidIndex)
    return result;

  result = local_bindings.FindIndex(var.name);
  if (result == kInvalidIndex)
    return result;

  // The locals start after all the params.
  return decl.GetNumParams() + result;
}

const Func* Module::GetFunc(const Var& var) const {
  return const_cast<Module*>(this)->GetFunc(var);
}

Func* Module::GetFunc(const Var& var) {
  Index index = func_bindings.FindIndex(var);
  if (index >= funcs.size())
    return nullptr;
  return funcs[index];
}

const Global* Module::GetGlobal(const Var& var) const {
  return const_cast<Module*>(this)->GetGlobal(var);
}

Global* Module::GetGlobal(const Var& var) {
  Index index = global_bindings.FindIndex(var);
  if (index >= globals.size())
    return nullptr;
  return globals[index];
}

Table* Module::GetTable(const Var& var) {
  Index index = table_bindings.FindIndex(var);
  if (index >= tables.size())
    return nullptr;
  return tables[index];
}

Memory* Module::GetMemory(const Var& var) {
  Index index = memory_bindings.FindIndex(var);
  if (index >= memories.size())
    return nullptr;
  return memories[index];
}

Exception* Module::GetExcept(const Var& var) const {
  Index index = GetExceptIndex(var);
  if (index >= excepts.size())
    return nullptr;
  return excepts[index];
}

const FuncType* Module::GetFuncType(const Var& var) const {
  return const_cast<Module*>(this)->GetFuncType(var);
}

FuncType* Module::GetFuncType(const Var& var) {
  Index index = func_type_bindings.FindIndex(var);
  if (index >= func_types.size())
    return nullptr;
  return func_types[index];
}


Index Module::GetFuncTypeIndex(const FuncSignature& sig) const {
  for (size_t i = 0; i < func_types.size(); ++i)
    if (func_types[i]->sig == sig)
      return i;
  return kInvalidIndex;
}

Index Module::GetFuncTypeIndex(const FuncDeclaration& decl) const {
  if (decl.has_func_type) {
    return GetFuncTypeIndex(decl.type_var);
  } else {
    return GetFuncTypeIndex(decl.sig);
  }
}

const Module* Script::GetFirstModule() const {
  return const_cast<Script*>(this)->GetFirstModule();
}

Module* Script::GetFirstModule() {
  for (const std::unique_ptr<Command>& command : commands) {
    if (auto* module_command = dyn_cast<ModuleCommand>(command.get()))
      return module_command->module;
  }
  return nullptr;
}

const Module* Script::GetModule(const Var& var) const {
  Index index = module_bindings.FindIndex(var);
  if (index >= commands.size())
    return nullptr;
  auto* command = cast<ModuleCommand>(commands[index].get());
  return command->module;
}

void MakeTypeBindingReverseMapping(
    const TypeVector& types,
    const BindingHash& bindings,
    std::vector<std::string>* out_reverse_mapping) {
  out_reverse_mapping->clear();
  out_reverse_mapping->resize(types.size());
  for (const auto& pair : bindings) {
    assert(static_cast<size_t>(pair.second.index) <
           out_reverse_mapping->size());
    (*out_reverse_mapping)[pair.second.index] = pair.first;
  }
}

void Module::AppendField(ModuleField* field) {
  if (!first_field)
    first_field = field;
  else if (last_field)
    last_field->next = field;
  last_field = field;
}

FuncType* Module::AppendImplicitFuncType(const Location& loc,
                                         const FuncSignature& sig) {
  FuncType* func_type = new FuncType();
  func_type->sig = sig;
  func_types.push_back(func_type);
  AppendField(new FuncTypeModuleField(func_type, loc));
  return func_type;
}

Var::Var(Index index) : type(VarType::Index), index(index) {
}

Var::Var(const StringSlice& name) : type(VarType::Name), name(name) {
}

Var::Var(Index index, const Location& loc_) : Var(index) {
  loc = loc;
}

Var::Var(const StringSlice& name, const Location& loc_) : Var(name) {
  loc = loc;
}

Var::Var(Var&& rhs) : loc(rhs.loc), type(rhs.type) {
  if (rhs.type == VarType::Index) {
    index = rhs.index;
  } else {
    name = rhs.name;
    rhs = Var(kInvalidIndex);
  }
}

Var::Var(const Var& rhs) : loc(rhs.loc), type(rhs.type) {
  if (rhs.type == VarType::Index) {
    index = rhs.index;
  } else {
    name = dup_string_slice(rhs.name);
  }
}

Var& Var::operator =(Var&& rhs) {
  loc = rhs.loc;
  type = rhs.type;
  if (rhs.type == VarType::Index) {
    index = rhs.index;
  } else {
    name = rhs.name;
    rhs = Var(kInvalidIndex);
  }
  return *this;
}

Var& Var::operator =(const Var& rhs) {
  loc = rhs.loc;
  type = rhs.type;
  if (rhs.type == VarType::Index) {
    index = rhs.index;
  } else {
    name = dup_string_slice(rhs.name);
  }
  return *this;
}

Var::~Var() {
  if (type == VarType::Name)
    destroy_string_slice(&name);
}

Const::Const(I32, uint32_t value, const Location& loc_)
    : loc(loc_), type(Type::I32), u32(value) {
}

Const::Const(I64, uint64_t value, const Location& loc_)
    : loc(loc_), type(Type::I64), u64(value) {
}

Const::Const(F32, uint32_t value, const Location& loc_)
    : loc(loc_), type(Type::F32), f32_bits(value) {
}

Const::Const(F64, uint64_t value, const Location& loc_)
    : loc(loc_), type(Type::F64), f64_bits(value) {
}

Block::Block() {
  ZeroMemory(label);
}

Block::Block(ExprList exprs) : exprs(std::move(exprs)) {
  ZeroMemory(label);
}

Block::~Block() {
  destroy_string_slice(&label);
}

Exception::Exception() {
  ZeroMemory(name);
}

Exception::Exception(const TypeVector& sig)
    : sig(sig) {
  ZeroMemory(name);
}

Exception::Exception(StringSlice name, const TypeVector& sig)
    : name(name), sig(sig) {}

Exception& Exception::operator =(const Exception& except) {
  name = dup_string_slice(except.name);
  sig = except.sig;
  return *this;
}

Catch::Catch() {}

Catch::Catch(const Var& var) : var(var) {}

Catch::Catch(ExprList exprs) : exprs(std::move(exprs)) {}

Catch::Catch(const Var& var, ExprList exprs)
    : var(var), exprs(std::move(exprs)) {}

IfExpr::~IfExpr() {
  delete true_;
}

TryExpr::~TryExpr() {
  delete block;
  for (Catch* catch_ : catches)
    delete catch_;
}

Expr::Expr(ExprType type) : type(type) {}

FuncType::FuncType() {
  ZeroMemory(name);
}

FuncType::~FuncType() {
  destroy_string_slice(&name);
}

FuncDeclaration::FuncDeclaration()
    : has_func_type(false), type_var(kInvalidIndex) {}

Func::Func() {
  ZeroMemory(name);
}

Func::~Func() {
  destroy_string_slice(&name);
}

Global::Global() : type(Type::Void), mutable_(false) {
  ZeroMemory(name);
}

Global::~Global() {
  destroy_string_slice(&name);
}

Table::Table() {
  ZeroMemory(name);
  ZeroMemory(elem_limits);
}

Table::~Table() {
  destroy_string_slice(&name);
}

ElemSegment::ElemSegment() : table_var(kInvalidIndex) {}

DataSegment::DataSegment() : data(nullptr), size(0) {}

DataSegment::~DataSegment() {
  delete[] data;
}

Memory::Memory() {
  ZeroMemory(name);
  ZeroMemory(page_limits);
}

Memory::~Memory() {
  destroy_string_slice(&name);
}

Import::Import() : kind(ExternalKind::Func), func(nullptr) {
  ZeroMemory(module_name);
  ZeroMemory(field_name);
}

Import::~Import() {
  destroy_string_slice(&module_name);
  destroy_string_slice(&field_name);
  switch (kind) {
    case ExternalKind::Func:
      delete func;
      break;
    case ExternalKind::Table:
      delete table;
      break;
    case ExternalKind::Memory:
      delete memory;
      break;
    case ExternalKind::Global:
      delete global;
      break;
    case ExternalKind::Except:
      delete except;
      break;
  }
}

Export::Export() {
  ZeroMemory(name);
}

Export::~Export() {
  destroy_string_slice(&name);
}

ModuleField::ModuleField(ModuleFieldType type, const Location& loc)
    : loc(loc), type(type), next(nullptr) {}

Module::Module()
    : first_field(nullptr),
      last_field(nullptr),
      num_except_imports(0),
      num_func_imports(0),
      num_table_imports(0),
      num_memory_imports(0),
      num_global_imports(0),
      start(0) {
  ZeroMemory(name);
}

Module::~Module() {
  destroy_string_slice(&name);

  ModuleField* field = first_field;
  while (field) {
    ModuleField* next_field = field->next;
    delete field;
    field = next_field;
  }
}

ScriptModule::ScriptModule() : type(ScriptModule::Type::Text), text(nullptr) {}

ScriptModule::~ScriptModule() {
  switch (type) {
    case ScriptModule::Type::Text:
      delete text;
      break;
    case ScriptModule::Type::Binary:
      destroy_string_slice(&binary.name);
      delete [] binary.data;
      break;
    case ScriptModule::Type::Quoted:
      destroy_string_slice(&quoted.name);
      delete [] binary.data;
      break;
  }
}

ActionInvoke::ActionInvoke() {}

Action::Action() : type(ActionType::Get), module_var(kInvalidIndex) {
  ZeroMemory(name);
}

Action::~Action() {
  destroy_string_slice(&name);
  switch (type) {
    case ActionType::Invoke:
      delete invoke;
      break;
    case ActionType::Get:
      break;
  }
}

Script::Script() {}

}  // namespace wabt
