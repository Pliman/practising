// pliman.amdxml2json
define(["dojo/_base/kernel",'dojo/_base/lang', 'dojo/_base/array'],function(dojo){
	//alert(dojo); //引入kernel可以 -- 引入其他也行，估计是其他模块也引入了kernel
	//alert(dojo.forEach); // dojo/_base/array
	
	/**
		 * 把 Node 转换成 JSON 格式
		 * 
		 * @param {Object}
		 *            node 用于转换的 节点
		 * @return {Object} obj JSON 格式的信息
		 */
		var nodeToObject_ = function(node) {
			if (!node) {
				return null;
			}
		
			var obj = null;
			var child;
			// 如果该节点值包含文本节点
			if (nodeHasValue_(node)) {
				if (node.attributes.length > 0) {// 如果包含属性，则节点为对象，值用$获取
					obj = {};
		
					dojo.forEach(node.attributes,function(attr) {
								obj[attr.name] = attr.value;
							});
		
					try {
						child = node.firstChild;
						if (child.nodeType == 3 /* TEXT_NODE */) {
							obj['$'] = child.data;
						} else if (child.nodeType == 4 /* CDATA_SECTION_NODE */) {
							obj['$'] = child.data;
						}
					} catch (e) {
						throw ("Xml to Json错误!\n");
					}
				} else {
					try {
						child = node.firstChild;
						if (child.nodeType == 3 /* TEXT_NODE */) {
							obj = child.data;
						} else if (child.nodeType == 4 /* CDATA_SECTION_NODE */) {
							obj = child.data;
						}
					} catch (e) {
						throw ("Xml to Json错误!\n");
					}
				}
			} else {
				obj = {};
				child = node.firstChild;
				if (child) {
					dojo.forEach(node.attributes,function(attr) {
								obj[attr.name] = attr.value;
							});
		
					while (child) {
						if (child.nodeType == 1 /* Node.ELEMENT_NODE */) {
							var isArray = false;
							var tagName = child.nodeName;
		
							// 如果已经存在该节点信息了，则转换成 Array 类型
							if (obj[tagName]) {
								if (obj[tagName].constructor != Array) {
									var curValue = obj[tagName];
									obj[tagName] = new Array;
									obj[tagName].push(curValue);
								}
								isArray = true;
							}
							var childObj = nodeToObject_(child);
		
							if (isArray)
								obj[tagName].push(childObj);
							else
								obj[tagName] = childObj;
						}
						child = child.nextSibling;
					}
				} else {
					if (node.attributes.length > 0) {
						dojo.forEach(node.attributes,function(attr) {
									obj[attr.name] = attr.value;
								});
					} else {
						obj = "";
					}
				}
			}
		
			return obj;
		};
		
		/**
		 * @private 判断该节点是否只包含文本节点
		 * @param {Object}
		 *            node 用于判断的 节点
		 * @return {Boolean} 如果只包含文本内容为 true
		 */
		var nodeHasValue_ = function(node) {
			if (node) {
				var child = node.firstChild;
				if (child
						&& child.nextSibling === null
						&& (child.nodeType === 3 /* Node.TEXT_NODE */|| child.nodeType === 4 /* CDATA_SECTION_NODE */))
					return true;
			}
			return false;
		};
	
	return {
		/**
		 * 解析xml文档
		 * 
		 * @param {Object}
		 *            xmlDoc
		 */
		parseDoc_ : function(xmlDoc) {
			if (xmlDoc) {
				var obj = null;
				if (xmlDoc && xmlDoc.firstChild) {
					var child = xmlDoc.firstChild;
					while (child) {
						if (child.nodeType == 1 /* Node.ELEMENT_NODE */) {
							obj = {};
							obj[child.nodeName] = nodeToObject_(child);
							break;
						}
						child = child.nextSibling;
					}
				}
		
				return obj;
			} else {
				alert('Xml处理对象为空!');
			}
		}
	};
});