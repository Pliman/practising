// background-script.js
console.log('bg.js');

function handleMessage(request, sender, sendResponse) {
	console.log("message from the content script: " +
		request.greeting);
	sendResponse({response: "response from background script"});
}

chrome.runtime.onMessage.addListener(handleMessage);