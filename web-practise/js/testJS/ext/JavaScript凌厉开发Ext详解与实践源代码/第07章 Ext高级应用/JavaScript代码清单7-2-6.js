//JavaScript代码清单7-2-6
/*1.*/	obj = {}; //建立obj的命名空间
/*2.*/	obj.extend = function(subClass, baseClass) {
/*3.*/	   function inheritance() {}
/*4.*/	   inheritance.prototype = baseClass.prototype;
/*5.*/	   subClass.prototype = new inheritance();
/*6.*/	   subClass.prototype.constructor = subClass;
/*7.*/	   subClass.baseConstructor = baseClass;
/*8.*/	   subClass.superClass = baseClass.prototype;
/*9.*/	}
/*10.*/	function Student(first, last, id) {
/*11.*/	    // 初始化属性
/*12.*/	}
/*13.*/	obj.extend(Student, Person);//第一个参数是子类，第二个参数是父类












