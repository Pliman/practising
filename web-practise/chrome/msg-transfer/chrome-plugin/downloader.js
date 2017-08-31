var allImages = [];

function getBase64FromImageUrl(nickname, id, groupName, url, type) {
	var img = new Image();

	img.setAttribute('crossOrigin', 'anonymous');

	img.onload = function () {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0);

		var dataURL = canvas.toDataURL("image/png");

		chrome.tabs.query({active: true}, function (tabs) {
			switch (type) {
				case 'avatar':
					chrome.tabs.sendMessage(tabs[0].id, {
						method: 'avatarDownloaded',
						data: {
							nickname: nickname,
							avatar: dataURL
						}
					});
					break;
				case 'message':
					chrome.tabs.sendMessage(tabs[0].id, {
						method: 'messageDownloaded',
						data: {
							nickname: nickname,
							id: id,
							imageData: dataURL,
							groupName: groupName
						}
					});
					break;
			}

		});
	};

	img.src = url;
}

function downloadImageMessage(nickname, id, groupName, url, type) {
	chrome.downloads.download({
		filename: id + '.jpg',
		url: url
	}, function (downloadId) {
		console.log("download begin, the downId is:" + downloadId);
	});
}

function downloadVoiceMessage(nickname, id, groupName, url, type) {
	chrome.downloads.download({
		filename: id + '.mp3',
		url: url
	}, function (downloadId) {
		console.log("download begin, the downId is:" + downloadId);
	});
}

chrome.extension.onMessage.addListener(function (message) {
	console.log('got event');
	console.log(message.method);
	switch (message.method) {
		case "downloadAvatar":
			getBase64FromImageUrl(message.nickname, '', '', message.url, 'avatar');
			break;
		case "downloadImageMessage":
			// getBase64FromImageUrl(message.nickname, message.id, message.groupName, message.url, 'message');
			downloadImageMessage(message.nickname, message.id, message.groupName, message.url, 'message');
			break;
		case "downloadVoiceMessage":
			console.log('downloadVoiceMessage');
			downloadVoiceMessage(message.nickname, message.id, message.groupName, message.url, 'voice');
			break;
	}
});
