###ng message使用重点：

1. ng-messages获取消息
1. ng-message="匹配消息"

###validate重点：

1. 获取ctrl
1. ctrl.$parsers.push(function (viewValue) {
1. ctrl.$setValidity('mobileValid', true);