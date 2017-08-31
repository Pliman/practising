// get the image
var img = document.getElementById("srcImg");
// create and customize the canvas
var canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 429;
document.body.appendChild(canvas);
// get the context
var ctx = canvas.getContext("2d");
// draw the image into the canvas
ctx.drawImage(img, 0, 0);

// get the image data object
var image = ctx.getImageData(0, 0, 300, 429);
// get the image data values
var imageData = image.data,
	length = imageData.length;
// set every fourth value to 50
for(var i=3; i < length; i+=4){
	imageData[i] = 100;
}
// after the manipulation, reset the data
image.data = imageData;
// and put the imagedata back to the canvas
ctx.putImageData(image, 0, 0);

document.getElementById("destImg").src = canvas.toDataURL();