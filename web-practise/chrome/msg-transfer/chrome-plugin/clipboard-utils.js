function triggerPaste(data, type) {
	simulateClick(base64toBlob(data, type));
	sendImage();
}

function base64toBlob(base64Data, contentType) {
	contentType = contentType || '';
	var sliceSize = 1024;
	var byteCharacters = atob(base64Data);
	var bytesLength = byteCharacters.length;
	var slicesCount = Math.ceil(bytesLength / sliceSize);
	var byteArrays = new Array(slicesCount);

	for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		var begin = sliceIndex * sliceSize;
		var end = Math.min(begin + sliceSize, bytesLength);

		var bytes = new Array(end - begin);
		for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
			bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, {type: contentType});
}

function simulateClick(data) {
	var event = new KeyboardEvent('paste', {
		// 类型比较重要，其他不是很重要
		ctrlKey: true,
		code: 118,
		isComposing: true
	});

	event.clipboardData = {
		items: [{
			getAsFile: function () {
				return data;
			},
			type: "image/png",
			kind: 'file'
		}]
	};

	document.getElementById('chatArea').dispatchEvent(event);
}

function sendImage() {
	assureImagePreviewer();
}

var imagePreviewerCounter = 10;
function assureImagePreviewer() {
	var imagePreviewer = document.querySelector('.image_preview');

	if (!imagePreviewer) {
		if (!imagePreviewerCounter) {
			imagePreviewerCounter = 10;
			return;
		}

		imagePreviewerCounter--;
		return setTimeout(function () {
			assureImagePreviewer()
		}, 800);
	}

	imagePreviewerCounter = 10;

	// 图片加载好，判断条件为loading隐藏了
	assureLoading(imagePreviewer);
}

var loadingCounter = 10;
function assureLoading(imagePreviewer) {
	var loading = imagePreviewer.querySelector('.loading');

	if (!loading) {
		if (!loadingCounter) {
			loadingCounter = 10;
			return;
		}

		loadingCounter--;
		return setTimeout(function () {
			assureLoading(imagePreviewer)
		}, 800);
	}

	loadingCounter = 10;

	assureLoadingDisplay(imagePreviewer, loading);
}

var loadingDisplayCounter = 10;
function assureLoadingDisplay(imagePreviewer, loading) {
	var loadingDisplay = getComputedStyle(loading).display;

	if (loadingDisplay != 'none') {
		if (!loadingDisplayCounter) {
			loadingDisplayCounter = 10;
			return;
		}

		loadingDisplayCounter--;
		return setTimeout(function () {
			assureLoadingDisplay(imagePreviewer, loading)
		}, 800);
	}

	loadingDisplayCounter = 10;
	doSend(imagePreviewer);
}

function doSend(imagePreviewer) {
	var sender = imagePreviewer.querySelector('a[ng-click="send()"]');
	sender.click();
}