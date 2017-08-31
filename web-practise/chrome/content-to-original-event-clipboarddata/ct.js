// content-script.js
document.getElementById('firePasteEvent').addEventListener('click', function () {
    var s1 = document.createElement('script');
    s1.appendChild(document.createTextNode('simulateClick("11111");'));
    (document.head || document.documentElement).appendChild(s1);
    s1.remove();
});

document.addEventListener('paste', function (evt) {
    console.log(evt.clipboardData);
});

var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('page-script.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
    this.remove();
};

// setTimeout(function () {
//     console.log(triggerPaste); //Uncaught ReferenceError: triggerPaste is not defined(…)
// }, 2000);

