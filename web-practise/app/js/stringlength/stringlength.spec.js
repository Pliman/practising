describe("String Real Length", function () {
  var a = 'Highlight usages in file 检查重复代码用于重构Highlight usages in file 检查重复代码用于重构Highlight usages in file 检查重复代码用于重构' +
    'Highlight usages in file 检查重复代码用于重构Highlight usages in file 检查重复代码用于重构Highlight usages in file 检查重复代码用于重构' +
    'Highlight usages in file 检查重复代码用于重构Highlight usages in file 检查重复代码用于重构';

  var b = "a检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构" +
    "a检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构";

  var c = "检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构" +
    "检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构检查重复代码用于重构";

  it("should equal 3", function () {
    var rtn = getMsgSplit(a);
    expect(rtn.msgs.length).toBe(3);
  });

  describe("Odd Char Code Length", function () {
    it("Should be 3", function () {
      var rtn = getMsgSplit(b);
      expect(rtn.msgs.length).toBe(3);
    });

    it("Should be 重构", function () {
      var rtn = getMsgSplit(b);
      expect(rtn.msgs[2]).toBe("重构");
    });
  });

  describe("Just 整除", function () {
    it("Should be 2", function () {
      var rtn = getMsgSplit(c);
      expect(rtn.msgs.length).toBe(2);
    });
  });
});
