// content-script.js

function handleResponse(message) {
	console.log("message from the background script: " +
		message.response);
}

function notifyBackgroundPage(e) {
	chrome.runtime.sendMessage(
		{greeting: "greeting from the content script"},
		handleResponse
	);
}

window.addEventListener("click", notifyBackgroundPage);