var app = angular.module('service', []);

app.factory('service', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	var queue = [];
	var processingTask = false;

	return {
		// apis
		changeCount: changeCount
	};

	function changeCount(cb) {
		addTasks(cb);

		$rootScope.$on('newComing', function () {
			processTasks(cb);
		});
	}

	function addTasks(cb) {
		$timeout(function () {
			var newTasks = [1,2,3,4,5,6];
			$rootScope.$broadcast('countChange', newTasks.length);
			$rootScope.$broadcast('newComing');
			queue = queue.concat(newTasks);
		}, 500);

		$timeout(function () {
			var newTasks = [7,8,9];
			$rootScope.$broadcast('countChange', newTasks.length);
			$rootScope.$broadcast('newComing');
			queue = queue.concat(newTasks);
		}, 600);

		$timeout(function () {
			cb && cb(null, 'All Tasks Added.');
		}, 700);
	}

	function processTasks(cb) {
		if (processingTask) {
			return;
		}
		processingTask = true;

		//$timeout可以触发$digest, setTimeout不能
		setTimeout(function () {
			var task = queue[0];
			if (task) {
				processSingleTask(task, function (err) {
					processingTask = false;

					if (err) {
						return cb && cb(err);
					}

					processTasks(cb);
				});
			} else {
				cb && cb(null, 'All Tasks Processed.');
			}
		}, 50);
	}

	function processSingleTask(task, cb) {
		setTimeout(function () {
			console.log('processing task: ' + task);
			queue.shift();
			$rootScope.$broadcast('countChange', -1);
			cb && cb(null);
		}, 50);
	}
}]);