function setReqProcessors(req, cb) {
	req.onsuccess = function (e) {
		cb && cb(null, e.target.result);
	};
	req.onerror = function (e) {
		cb && cb(e);
	};
}

//  Now we can open our database
var request = indexedDB.open('it', 2);
request.onsuccess = function () {
	db = request.result;

	var tx = db.transaction('dan', 'readwrite');
	var store = tx.objectStore('dan');
	var req = store.put({id: 'c', createTime: new Date().getTime() + 61 * 1000});
	var req = store.put({id: 'a', createTime: new Date().getTime() - 61 * 1000});
	var req1 = store.put({id: 'b', createTime: new Date().getTime()});

	range = IDBKeyRange.lowerBound(1408909858436, false);

	var req = store.index('date').openCursor(range, 'prev');
	setReqProcessors(req, function (err, cursor) {
		if (cursor && cursor.value) {
			var div = document.createElement('div');
			div.innerText = 'id: ' + cursor.value.id + ' create time:' + cursor.value.createTime;
			document.body.appendChild(div);
			cursor.continue();
		}
	});
};

request.onerror = function (e) {
	cb && cb(e);
	createCb && createCb(e);
};

request.onupgradeneeded = function (event) {
	var db = event.target.result;

	// 创建新的数据库
	store = db.createObjectStore('dan', {
		keyPath: 'id'
	});
	store.createIndex('date', 'createTime');
	// 回调执行过了，防止onsuccess重复执行cb
	// createCb = null;
};
