setTimeout(function () {
	var isSending = false;
	var socket = null;
	var count = 0;
	var cache = new Array();
	var chatArea = document.querySelector('#chatArea');
	var messageArea = chatArea.querySelector('.chat_bd');
	var contactBody = document.querySelector('#J_NavChatScrollBody');
	var titleBody = document.querySelector('.title_name');
	var username = '';
	var contactGrabed = {};
	var currentContactNickname = '';
	var PAGE_INFO = {};

	var s = document.createElement('script');
	s.src = chrome.extension.getURL('angular_inject.js');
	(document.head || document.documentElement).appendChild(s);
	s.onload = function () {
		s.parentNode.removeChild(s);
	};

	// Event listener
	document.addEventListener('accountInfoEvent', function (e) {
		PAGE_INFO.accountInfo = {
			baseRequest: JSON.parse(e.detail.baseRequest),
			webwx_data_ticket: e.detail.webwx_data_ticket
		}
		console.log(PAGE_INFO)
	});


	var cus = document.createElement('script');
	cus.src = chrome.extension.getURL('clipboard-utils.js');
	(document.head || document.documentElement).appendChild(cus);
	cus.onload = function () {
		this.remove();
	};

	function connect() {
		username = document.querySelector('.display_name').innerHTML;
		socket = new io('http://127.0.0.1:3000');

		socket.on('connect', function () {
		});

		chrome.runtime.onMessage.addListener(function (message) {
			console.log(message);
			if (message.method == "avatarDownloaded") {
				socket.emit('avatarLoaded', {
					nickname: message.data.nickname,
					avatar: message.data.avatar
				})
			} else if (message.method == 'messageDownloaded') {
				socket.emit('imageMessageLoaded', message.data);
			}
		});

		socket.on('messageToWechat', function (data) {
			var toName = data.to;
			var names = document.querySelectorAll('.nickname_text');

			for (var i = names.length - 1; i >= 0; i--) {
				var name = names[i];
				if (name.innerHTML == toName) {
					name.click();
					var textarea = document.getElementById('editArea');
					textarea.innerHTML = data.msg;
					textarea.dispatchEvent(new Event('input'));
					setTimeout(function () {
						document.getElementsByClassName('btn btn_send')[0].click();
					}, 0);
					break;
				}
			}
		});

		socket.on('imageMessage', function (data) {
			var s1 = document.createElement('script');
			s1.appendChild(document.createTextNode('triggerPaste("' + data.base64Str + '","' + data.type + '");'));
			(document.head || document.documentElement).appendChild(s1);
			s1.remove();
		});

		socket.on('getMessageFromWechat', function (data) {
			currentContactNickname = data.nickname;
			openChatWindow(currentContactNickname);
		});

		socket.on('reloadContent', function (data) {
			traceTick();
		});

		socket.on('client_send_to_wechat_image', function (data) {
			var toName = data.to;
			var names = document.querySelectorAll('.nickname_text');
			//   var file = new File([data.imgData], "下载.png", {type: "image/png"});
			//   var uploadForm = new FormData();
			//   uploadForm.append('id', 'WU_FILE_100');
			//   uploadForm.append('name', '下载.png');
			//   uploadForm.append('type', 'image/png');
			//   uploadForm.append('lastModifiedDate', 'Thu Oct 27 2016 14:05:32 GMT+0800 (CST)');
			//   uploadForm.append('size', file.size);
			//   uploadForm.append('mediatype', 'pic');
			//   uploadForm.append('uploadmediarequest', JSON.stringify({
			//     "UploadType":2,
			//     "BaseRequest": {
			//       "Uin":2361372882,
			//       "Sid":"Rg09ZzrKFPuYKdtJ",
			//       "Skey":"@crypt_eb7b4a94_ccf04a944b677b32b9f9f577ccbd4210",
			//       "DeviceID":"e085353200217379"
			//     },
			//     "ClientMediaId": 1477563808923,
			//     "TotalLen":3000,
			//     "StartPos":0,
			//     "DataLen":3000,
			//     "MediaType":4,
			//     "FromUserName":"@ff3ebf9e3d87bc92e3eb1a3b0cce0654eed97583f8423189ae0fe7cc6509c420",
			//     "ToUserName":"filehelper"
			//   }
			// ));
			//   uploadForm.append('webwx_data_ticket', PAGE_INFO.accountInfo.webwx_data_ticket);
			//   uploadForm.append('pass_ticket', PAGE_INFO.accountInfo.pass_ticket);
			//   uploadForm.append('filename', file);
			//   var oReq = new XMLHttpRequest();
			//   oReq.open("POST", "https://file.wx2.qq.com/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json");
			//   oReq.send(uploadForm);


			// for (var i = names.length - 1 ; i >= 0 ; i--) {
			//   var name = names[i];
			//   if (name.innerHTML == toName) {
			//     name.click();
			//     var textarea = document.getElementById('editArea');
			//     textarea.innerHTML = '<img src="' + data.imgData + '">';
			//     textarea.dispatchEvent(new Event('input'));
			//     setTimeout(function() {
			//       document.getElementsByClassName('btn btn_send')[0].click();
			//     }, 0);
			//     break;
			//   }
			// }
		});

		return;
	}

	function openChatWindow(nickname) {
		var contactDoms = contactBody.querySelectorAll('.chat_item');
		if (!contactDoms.length) {
			return;
		}

		for (var i = 0; i < contactDoms.length; i++) {
			var contactDom = contactDoms[i];
			var _nickname = contactDom.querySelector('.nickname').innerText;
			if (_nickname == nickname) {
				contactDom.click();
				break;
			}
		}
	}

	function grabAvatar(contactInfo) {
		chrome.runtime.sendMessage({
			method: 'downloadAvatar',
			nickname: contactInfo.nickname,
			url: contactInfo.avatarUrl
		})
	}

	function grabImageMessage(message) {
		chrome.runtime.sendMessage({
			method: 'downloadImageMessage',
			nickname: message.nickname,
			groupName: message.groupName,
			url: message.msg,
			id: message.id
		});
	}

	function grabVoiceMessage(message) {
		var audio = document.getElementById('voiceMsgPlayer').querySelector("audio");

		if (!audio) {
			return setTimeout(function () {
				grabVoiceMessage(message)
			}, 800);
		}

		chrome.extension.sendMessage({
			method: 'downloadVoiceMessage',
			nickname: message.nickname,
			groupName: message.groupName,
			url: audio.src,
			id: message.id
		});
	}

	function grabContact() {
		var contacts = [];
		var contactDoms = contactBody.querySelectorAll('.chat_item');
		if (!contactDoms.length) {
			return;
		}

		for (var i = 0; i < contactDoms.length; i++) {
			var contactDom = contactDoms[i];
			var nickname = contactDom.querySelector('.nickname').innerText;
			var newMessage = !!contactDom.querySelector('.web_wechat_reddot') || !!contactDom.querySelector('.web_wechat_reddot_middle');
			var contactInfo = {};
			if (contactGrabed[nickname]) {
				contactInfo = Object.assign(contactGrabed[nickname], {
					nickname: nickname,
					newMessage: newMessage
				});
			} else {
				var contactInfo = {
					nickname: nickname,
					newMessage: newMessage,
					avatar: 'loading',
					avatarUrl: contactDom.querySelector('img').src
				};

				contactGrabed[nickname] = contactInfo;
			}
			contacts.push(contactInfo);

			if (contactInfo.avatar == 'loading') {
				grabAvatar(contactInfo);
			}
		}

		return contacts;
	}

	function grabMessage() {
		var messages = [];
		var messageDoms = document.querySelector('.chat_bd').querySelectorAll('.content');

		for (var i = 0; i < messageDoms.length; i++) {
			var messageDom = messageDoms[i];

			var msgInfo = messageDom.querySelector('.bubble');
			var msgId = '';

			if (msgInfo && msgInfo.attributes['data-cm'].nodeValue) {
				msgId = JSON.parse(msgInfo.attributes['data-cm'].nodeValue).msgId;
			}

			var nickNameDom = messageDoms[i].querySelector('.nickname');
			var messageDom = null;
			var type = '';
			var textDom = messageDoms[i].querySelector('.js_message_plain');
			var imgDom = messageDoms[i].querySelector('.msg-img');
			var voiceDom = messageDoms[i].querySelector('.voice');

			var msg = '';
			if (textDom) {
				type = 'text';
				msg = textDom.innerHTML;
			} else if (imgDom) {
				type = 'img';
				msg = imgDom.src;
			} else if (voiceDom) {
				type = 'voice';
				document.getElementById('voiceMsgPlayer').click();
				msg = msgId;
			}

			if (!type) {
				continue;
			}

			var elMsg = {
				groupName: currentContactNickname,
				nickName: nickNameDom ? nickNameDom.innerHTML : username,
				msg: msg,
				type: type,
				id: msgId
			};

			if (imgDom) {
				grabImageMessage(elMsg);
			} else if (voiceDom) {
				grabVoiceMessage(elMsg);
				voiceDom.click();
			}

			messages.push(elMsg);
		}

		return messages;
	}

	function traceTick() {
		var contacts = grabContact();
		var messages = null;
		if (currentContactNickname) {
			messages = grabMessage();
		}

		socket.emit('messageFromWechat', {
			messages: messages,
			contacts: contacts
		});
		// 两秒后爬其他组信息
		// setTimeout(function () {
		//   var groupsWithNewMessage = contactBody.querySelectorAll('.web_wechat_reddot_middle');
		//   if (groupsWithNewMessage.length) {
		//     groupsWithNewMessage[0].click();
		//     setTimeout(function () {
		//       grabMessage();
		//     }, 0);
		//   }
		//
		//   setTimeout(function () {
		//     traceTick();
		//   }, 2000);
		// }, 5000);
	}

	connect();

	// // accept messages from background
	// chrome.runtime.onMessage.addListener (function (request, sender, sendResponse) {
	//   alert("Contents Of Text File = " + request.data);
	// });

}, 5000);
