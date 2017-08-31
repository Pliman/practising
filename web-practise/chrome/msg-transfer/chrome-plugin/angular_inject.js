

setTimeout(function () {
  var $rootScope = angular.element(document.body).injector().get('$rootScope');
  var injector = angular.injector(['Services', 'ng']);
  var accountFactory = injector.get('accountFactory');
  var utilFactory = injector.get('utilFactory');
  var confFactory = injector.get('confFactory');
  var chatFactory = injector.get('chatFactory');
  var contactFactory = injector.get('contactFactory');
  var $http = injector.get('$http');
  var accountInfo = {
    baseRequest: accountFactory.getBaseRequest().BaseRequest
  }
  var WebUploader = window.WebUploader;

  document.dispatchEvent(new CustomEvent('accountInfoEvent', {
    detail: {
      baseRequest: JSON.stringify(accountInfo.baseRequest),
      webwx_data_ticket: utilFactory.getCookie("webwx_data_ticket"),
      pass_ticket: accountFactory.getPassticket()
    }
  }));


  // try {
  //   var uploader = WebUploader.create({
  //     auto: !0,
  //     dnd: "#chatArea",
  //     paste: utilFactory.browser.webkit ? "#chatArea" : void 0,
  //     swf: confFactory.RES_PATH + "third_party/webuploader-0.1.5/Uploader.swf",
  //     server: confFactory.API_webwxuploadmedia + "?f=json",
  //     fileVal: "filename",
  //     pick: ".js_fileupload",
  //     compress: false,
  //     duplicate: true,
  //     threads: true,
  //     chunked: true,
  //     chunkSize: 524288
  //   }).on("beforeFileQueued", function(e) {
  //     if (e._checked) {
  //       return !0;
  //     }
  //
  //     if (0 == e.size) {
  //       return uploader.skipFile(e);
  //     }
  //
  //     //a: confFactory
  //     //s: chatFactory
  //     //i: accountFactory
  //     //u: utilFactory
  //     //c: contactFactory
  //
  //     e.MMSendMsg = chatFactory.createMessage({
  //       MsgType: confFactory.MSGTYPE_IMAGE,
  //       FileName: e.name,
  //       FileSize: e.size,
  //       MMFileId: e.id,
  //       MMFileExt: e.ext,
  //       MMUploadProgress: 0,
  //       MMFileStatus: confFactory.MM_SEND_FILE_STATUS_SENDING
  //     });
  //     chatFactory.appendMessage(e.MMSendMsg);
  //     var scope =  angular.element(document.body.querySelector('#chatArea')).scope();
  //     scope.$$phase || scope.$digest();
  //
  //     return uploader.md5File(e).then(function(t) {
  //       function n(e, t, o) {
  //         var r = angular.extend(accountFactory.getBaseRequest(), {
  //           ClientMediaId: utilFactory.now(),
  //           TotalLen: e.size,
  //           StartPos: 0,
  //           DataLen: e.size,
  //           MediaType: confFactory.UPLOAD_MEDIA_TYPE_ATTACHMENT,
  //           FromUserName: contactFactory.FromUserName,
  //           ToUserName: contactFactory.ToUserName,
  //           FileMd5: contactFactory.FileMd5,
  //           AESKey: contactFactory.AESKey,
  //           Signature: contactFactory.Signature
  //         });
  //
  //         var l = {
  //           mediatype: 'pic',
  //           uploadmediarequest: JSON.stringify(angular.extend({
  //               UploadType: 1
  //           }, r)),
  //           webwx_data_ticket: utilFactory.getCookie("webwx_data_ticket"),
  //           pass_ticket: decodeURIComponent(accountFactory.getPassticket())
  //         };
  //         e._uploadParams = l,
  //         e._uploadmediarequestBase = r,
  //         t ? (B.trigger("fileQueued", e),
  //         B.trigger("uploadSuccess", e, o),
  //         B.skipFile(e)) : (e._checked = !0,
  //         B.addFiles(e))
  //       }
  //       console.log("md5 result:", t);
  //       var c, l = {
  //           FromUserName: accountFactory.getUserName(),
  //           ToUserName: chatFactory.getCurrentUserName(),
  //           FileSize: e.size,
  //           FileMd5: t,
  //           FileName: e.name,
  //           FileType: 7
  //       };
  //       if (r) {
  //         var f = angular.extend(l, accountFactory.getBaseRequest());
  //         c = angular.extend({}, l);
  //         $http({
  //           method: "POST",
  //           url: confFactory.API_checkupload,
  //           data: f
  //         }).success(function(t) {
  //           if (!t.BaseResponse.Ret) {
  //             c = angular.extend(c, {
  //               AESKey: t.AESKey,
  //               Signature: t.Signature
  //             });
  //             e.Signature = t.Signature;
  //             n(e, t.MediaId, t);
  //           } else {
  //             e.MMSendMsg.MMFileStatus = confFactory.MM_SEND_FILE_STATUS_FAIL;
  //             e.MMSendMsg.MMStatus = confFactory.MSG_SEND_STATUS_FAIL;
  //           }
  //         })
  //       } else {
  //         c = angular.extend({}, l);
  //         n(e);
  //       }
  //     })
  //   }).on("fileQueued", function(e) {
  //     e.onQueued.call(e);
  //   }).on("uploadBeforeSend", function(e, t) {
  //     var o = e.file;
  //     o._data || {};
  //     angular.extend(t, o._uploadParams, {
  //       uploadmediarequest: JSON.stringify(angular.extend({
  //         UploadType: 2
  //       }, o._uploadmediarequestBase))
  //     })
  //   }).on("uploadProgress", function(e, t) {
  //     e.onProgress.call(e, t)
  //   }).on("uploadFinished", function() {
  //     uploader.reset()
  //   }).on("uploadSuccess", function(e, t) {
  //     if (0 == e.BaseResponse.Ret) {
  //         var o = this.MMSendMsg;
  //         o.MediaId = e.MediaId,
  //         o.Signature = this.Signature,
  //         chatFactory.sendMessage(o),
  //         o.MMFileStatus = confFactory.MM_SEND_FILE_STATUS_SUCCESS,
  //         t.$$phase || t.$digest()
  //     }
  //   }).on("uploadError", function(e, t) {
  //     e.onError.call(e, t)
  //   })
  // } catch (n) {
  // }
}, 5000);
