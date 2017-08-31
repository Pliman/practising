var cropper = null;
window.selectImage = function (fileList) {
	cropper.loadImage(fileList[0]);
};

var mainCanvas = $('#cropper');
cropper = new ImageCropper(mainCanvas.width(), mainCanvas.height(), 140, 140);
cropper.setCanvas("cropper");
cropper.addPreview("preview140");
cropper.addPreview("preview50");

$('#rotateRight').bind('click', function () {
	cropper.rotate(90);
});