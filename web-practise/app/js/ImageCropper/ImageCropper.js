/**
 * ImageCropper original by Flashlizi, modified by Pliman, Copyright (c) 2011 RIAidea.com
 * Original homepage: http://www.riaidea.com/blog/
 * New homepage: https://github.com/Pliman/ImageCropper
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

(function(scope){

	var ImageCropper = function(width, height, cropWidth, cropHeight)
	{
		this.width = width;
		this.height = height;
		this.cropWidth = cropWidth;
		this.cropHeight = cropHeight;

		this.image = null;
		this.imageCanvas = null;
		this.imageContext = null;
		this.imageScale = 1;
		this.imageRotation = 0;

		this.imageLeft = 0;
		this.imageTop = 0;
		this.imageViewLeft = 0;
		this.imageViewTop = 0;

		this.canvas = null;
		this.context = null;
		this.previews = [];

		this.maskGroup = [];
		this.maskAlpha = 0.4;
		this.maskColor = "#fff";

		this.cropLeft = 0;
		this.cropTop = 0;
		this.cropViewWidth = cropWidth;
		this.cropViewHeight = cropHeight;

		this.dragSize = 7;
		this.dragColor = "#666";
		this.resizingDragger = null;
		this.minLength = 10;
		this.draggers = {
			upperLeft:{
				dragLeft: 0,
				dragTop: 0,
				inDragger: false
			},
			upperRight:{
				dragLeft: 0,
				dragTop: 0,
				inDragger: false
			},
			bottomLeft:{
				dragLeft: 0,
				dragTop: 0,
				inDragger: false
			},
			bottomRight:{
				dragLeft: 0,
				dragTop: 0,
				inDragger: false
			}
		};

		this.mouseX = 0;
		this.mouseY = 0;
		this.inCropper = false;
		this.inDragger = false;
		this.isMoving = false;
		this.isResizing = false;

		//move and resize help properties
		this.mouseStartX = 0;
		this.mouseStartY = 0;
		this.cropStartLeft = 0;
		this.cropStartTop = 0;
		this.cropStartWidth = 0;
		this.cropStartHeight = 0;
	}
	scope.ImageCropper = ImageCropper;

	ImageCropper.prototype.setCanvas = function(canvas)
	{
		//working canvas
		this.canvas = document.getElementById(canvas) || canvas;
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.oncontextmenu = this.canvas.onselectstart = function(){return false;};

		//caching canvas
		this.imageCanvas = document.createElement("canvas");
		this.imageContext = this.imageCanvas.getContext("2d");
		this.imageCanvas.width = this.width;
		this.imageCanvas.height = this.height;
	}

	ImageCropper.prototype.addPreview = function(canvas)
	{
		var preview = document.getElementById(canvas) || canvas;
		var context = preview.getContext("2d");
		this.previews.push(context);
	}

	ImageCropper.prototype.loadImage = function(file)
	{
		if(!this.isAvaiable() || !this.isImage(file)) return;
		var reader = new FileReader();
		var me = this;
		reader.readAsDataURL(file);
		reader.onload = function(evt)
		{
			if(!me.image) me.image = new Image();
			me.image.onload = function(e){me._init()};
			me.image.src = evt.target.result;
		}
	};

	ImageCropper.prototype.loadBase64Image = function(src)
	{
		if(!this.isAvaiable()) return;
		var me = this;
		if(!me.image) me.image = new Image();
		me.image.onload = function(e){me._init()};
		me.image.src = src;
	};

	ImageCropper.prototype._init = function()
	{
		//初始化图片的缩放比例和位置
		var scale = Math.min(this.width/this.image.width, this.height/this.image.height);
		if (scale > 1) scale = Math.min(this.cropViewWidth/this.image.width, this.cropViewHeight/this.image.height);
		if (this.image.width*scale<this.cropViewWidth) scale = Math.min(scale, this.cropViewWidth/this.image.width);
		if (this.image.height*scale<this.cropViewHeight) scale = Math.min(scale, this.cropViewHeight/this.image.height);

		this.imageViewLeft = this.imageLeft = (this.width - this.image.width*scale)/2;
		this.imageViewTop = this.imageTop = (this.height - this.image.height*scale)/2;
		this.imageScale = scale;
		this.imageRotation = 0;

		//crop view size
		var minSize = Math.min(this.image.width*scale, this.image.height*scale);
		this.cropViewWidth = Math.min(minSize, this.cropWidth);
		this.cropViewHeight = Math.min(minSize, this.cropHeight);
		this.cropLeft = (this.width - this.cropViewWidth)/2;
		this.cropTop = (this.height - this.cropViewHeight)/2;

		//resize rectangle dragger
		this._calcDragCordin();

		this._update();

		//register event handlers
		var me = this;
		this.canvas.onmousedown = function(e){me._mouseHandler.call(me, e)};
		this.canvas.onmouseup = function(e){me._mouseHandler.call(me, e)};
		this.canvas.onmousemove = function(e){me._mouseHandler.call(me, e)};
	}

	ImageCropper.prototype._calcDragCordin = function() {
		this.draggers.upperLeft.dragLeft = this.cropLeft - this.dragSize/2;
		this.draggers.upperLeft.dragTop = this.cropTop - this.dragSize/2;

		this.draggers.upperRight.dragLeft = this.cropLeft + this.cropViewWidth - this.dragSize/2;
		this.draggers.upperRight.dragTop = this.cropTop - this.dragSize/2;

		this.draggers.bottomLeft.dragLeft = this.cropLeft - this.dragSize/2;
		this.draggers.bottomLeft.dragTop = this.cropTop + this.cropViewHeight - this.dragSize/2;

		this.draggers.bottomRight.dragLeft = this.cropLeft + this.cropViewWidth - this.dragSize/2;
		this.draggers.bottomRight.dragTop = this.cropTop + this.cropViewHeight - this.dragSize/2;
	}

	ImageCropper.prototype._mouseHandler = function(e)
	{
		if(e.type == "mousemove")
		{
			var clientRect = this.canvas.getClientRects()[0];
			this.mouseX = e.pageX - clientRect.left;
			this.mouseY = e.pageY - clientRect.top;
			this._checkMouseBounds();
			this.canvas.style.cursor = (this.inDragger || this.isResizing) ? this._getDraggerCursor() : (this.inCropper || this.isMoving)  ? "move" : "";
			this.isMoving ? this._move() : this.isResizing ? this._resize() : null;
		}else if(e.type == "mousedown")
		{
			this.mouseStartX = this.mouseX;
			this.mouseStartY = this.mouseY;
			this.cropStartLeft = this.cropLeft;
			this.cropStartTop = this.cropTop;
			this.cropStartWidth = this.cropViewWidth;
			this.cropStartHeight = this.cropViewHeight;
			this.inCropper ? this.isMoving = true : this.inDragger ? this._setResizing() : null;
		}else if(e.type == "mouseup")
		{
			this.isMoving = this.isResizing = false;
			this.resizingDragger = null;
		}
	}

	ImageCropper.prototype._setResizing = function() {
		this.isResizing = true;

		if (this.draggers.upperLeft.inDragger) {
			this.resizingDragger = 'upperLeft';
		} else if (this.draggers.upperRight.inDragger) {
			this.resizingDragger = 'upperRight';
		} else if (this.draggers.bottomLeft.inDragger) {
			this.resizingDragger = 'bottomLeft';
		} else {
			this.resizingDragger = 'bottomRight';
		}
	}

	ImageCropper.prototype._getDraggerCursor = function() {
		if (this.resizingDragger) {
			switch (this.resizingDragger) {
				case 'upperLeft':
					return 'nw-resize';
				case 'upperRight':
					return 'ne-resize';
				case 'bottomLeft':
					return 'sw-resize';
				default:
					return 'se-resize';
			}
		}

		if (this.draggers.upperLeft.inDragger) {
			return 'nw-resize';
		} else if (this.draggers.upperRight.inDragger) {
			return 'ne-resize';
		} else if (this.draggers.bottomLeft.inDragger) {
			return 'sw-resize';
		} else {
			return 'se-resize';
		}
	}

	ImageCropper.prototype._checkMouseBounds = function()
	{
		this.inCropper = (this.mouseX >= this.cropLeft && this.mouseX <= this.cropLeft+this.cropViewWidth &&
			this.mouseY >= this.cropTop && this.mouseY <= this.cropTop+this.cropViewHeight);

		this.draggers.upperLeft.inDragger = (this.mouseX >= this.draggers.upperLeft.dragLeft && this.mouseX <= this.draggers.upperLeft.dragLeft+this.dragSize &&
			this.mouseY >= this.draggers.upperLeft.dragTop && this.mouseY <= this.draggers.upperLeft.dragTop+this.dragSize);
		this.draggers.upperRight.inDragger = (this.mouseX >= this.draggers.upperRight.dragLeft && this.mouseX <= this.draggers.upperRight.dragLeft+this.dragSize &&
			this.mouseY >= this.draggers.upperRight.dragTop && this.mouseY <= this.draggers.upperRight.dragTop+this.dragSize);
		this.draggers.bottomLeft.inDragger = (this.mouseX >= this.draggers.bottomLeft.dragLeft && this.mouseX <= this.draggers.bottomLeft.dragLeft+this.dragSize &&
			this.mouseY >= this.draggers.bottomLeft.dragTop && this.mouseY <= this.draggers.bottomLeft.dragTop+this.dragSize);
		this.draggers.bottomRight.inDragger = (this.mouseX >= this.draggers.bottomRight.dragLeft && this.mouseX <= this.draggers.bottomRight.dragLeft+this.dragSize &&
			this.mouseY >= this.draggers.bottomRight.dragTop && this.mouseY <= this.draggers.bottomRight.dragTop+this.dragSize);

		this.inDragger = this.draggers.upperLeft.inDragger || this.draggers.upperRight.inDragger || this.draggers.bottomLeft.inDragger
			 || this.draggers.bottomRight.inDragger;

		this.inCropper = this.inCropper && !this.inDragger;
	}

	ImageCropper.prototype._move = function()
	{
		var deltaX = this.mouseX - this.mouseStartX;
		var deltaY = this.mouseY - this.mouseStartY;

		this.cropLeft = Math.max(this.imageViewLeft, this.cropStartLeft + deltaX);
		this.cropLeft = Math.min(this.cropLeft, this.width-this.imageViewLeft-this.cropViewWidth);
		this.cropTop = Math.max(this.imageViewTop, this.cropStartTop + deltaY);
		this.cropTop = Math.min(this.cropTop, this.height-this.imageViewTop-this.cropViewHeight);

		this._calcDragCordin();
		this._update();
	}

	ImageCropper.prototype._resize = function()
	{
		var deltaX = this.mouseX - this.mouseStartX;
		var deltaY = this.mouseY - this.mouseStartY;

		var cw,ch;
		var endOfXMinDrag = false,endOfYMinDrag = false;
		var endOfXMaxDrag = false,endOfYMaxDrag = false;
		switch (this.resizingDragger) {
			case 'upperLeft':
				// 处理最小缩放
				cw = this.cropStartWidth - deltaX;
				if (cw <= this.minLength) {
					cw = this.minLength;
					endOfXMinDrag = true;
				}
				ch = this.cropStartHeight - deltaY;
				if (ch <= this.minLength) {
					ch = this.minLength;
					endOfYMinDrag = true;
				}
				// 处理最大缩放
				if (cw >= this.cropStartWidth + this.cropStartLeft-this.imageViewLeft) {
					cw = this.cropStartWidth + this.cropStartLeft-this.imageViewLeft;
					endOfXMaxDrag = true;
				}
				if (ch >= this.cropStartHeight + this.cropStartTop-this.imageViewTop) {
					ch = this.cropStartHeight + this.cropStartTop-this.imageViewTop;
					endOfYMaxDrag = true;
				}

				// 达到最小宽高时，也需要设置起点坐标
				endOfXMinDrag ? (this.cropLeft = this.cropStartLeft + this.cropStartWidth - this.minLength) : endOfXMaxDrag ? (this.cropLeft = this.imageViewLeft) : (this.cropLeft = this.cropStartLeft + deltaX);
				endOfYMinDrag ? (this.cropTop = this.cropStartTop + this.cropStartHeight - this.minLength) : endOfYMaxDrag ? (this.cropTop = this.imageViewTop) : (this.cropTop = this.cropStartTop + deltaY);
				break;
			case 'upperRight':
				ch = this.cropStartHeight - deltaY;
				if (ch <= this.minLength) {
					ch = this.minLength;
					endOfYMinDrag = true;
				}
				if (ch >= this.cropStartHeight + this.cropStartTop-this.imageViewTop) {
					ch = this.cropStartHeight + this.cropStartTop-this.imageViewTop;
					endOfYMaxDrag = true;
				}
				cw = Math.max(this.minLength, this.cropStartWidth + deltaX);
				cw = Math.min(cw, this.width-this.cropStartLeft-this.imageViewLeft);

				// 达到最小宽高时，也需要设置起点坐标
				endOfYMinDrag ? (this.cropTop = this.cropStartTop + this.cropStartHeight - this.minLength) : endOfYMaxDrag ? (this.cropTop = this.imageViewTop) : (this.cropTop = this.cropStartTop + deltaY);
				break;
			case 'bottomLeft':
				cw = this.cropStartWidth - deltaX;
				if (cw <= this.minLength) {
					cw = this.minLength;
					endOfXMinDrag = true;
				}
				if (cw >= this.cropStartWidth + this.cropStartLeft-this.imageViewLeft) {
					cw = this.cropStartWidth + this.cropStartLeft-this.imageViewLeft;
					endOfXMaxDrag = true;
				}

				ch = Math.max(this.minLength, this.cropStartHeight + deltaY);
				ch = Math.min(ch, this.height-this.cropStartTop-this.imageViewTop);

				// 达到最小宽高时，也需要设置起点坐标
				endOfXMinDrag ? (this.cropLeft = this.cropStartLeft + this.cropStartWidth - this.minLength) : endOfXMaxDrag ? (this.cropLeft = this.imageViewLeft) : (this.cropLeft = this.cropStartLeft + deltaX);
				break;
			default:
				cw = Math.max(this.minLength, this.cropStartWidth + deltaX);
				ch = Math.max(this.minLength, this.cropStartHeight + deltaY);
				cw = Math.min(cw, this.width-this.cropStartLeft-this.imageViewLeft);
				ch = Math.min(ch, this.height-this.cropStartTop-this.imageViewTop);
		}

		this.cropViewWidth = cw;
		this.cropViewHeight = ch;

		this._calcDragCordin();
		this._update();
	}

	ImageCropper.prototype.rotate = function(angle)
	{
		if(!this.image) return;
		this.imageRotation += angle;

		//根据旋转角度来改变图片视域的left和top
		var rotateVertical = Math.abs(this.imageRotation%180)==90;
		this.imageViewLeft = rotateVertical ? this.imageTop : this.imageLeft;
		this.imageViewTop = rotateVertical ? this.imageLeft : this.imageTop;

		//更新裁剪和变形的位置
		this.cropLeft = (this.width - this.cropViewWidth)/2;
		this.cropTop = (this.height - this.cropViewHeight)/2;

		this._calcDragCordin();
		this._update();
	}

	ImageCropper.prototype._update = function()
	{
		this.context.clearRect(0, 0, this.width, this.height);

		this._drawImage();
		this._drawMask();
		this._drawDragger();
		this._drawPreview();
	}

	ImageCropper.prototype._drawImage = function()
	{
		this.imageContext.clearRect(0, 0, this.width, this.height);
		this.imageContext.save();
		var angle = this.imageRotation%360;
		this.imageContext.translate(this.imageViewLeft, this.imageViewTop);
		this.imageContext.scale(this.imageScale, this.imageScale);
		this.imageContext.rotate(this.imageRotation*Math.PI/180);

		switch((360-angle)%360)
		{
			case 90:
				this.imageContext.drawImage(this.image, -this.image.width, 0);
				break;
			case 180:
				this.imageContext.drawImage(this.image, -this.image.width, -this.image.height);
				break;
			case 270:
				this.imageContext.drawImage(this.image, 0, -this.image.height);
				break;
			case 0:
			default:
				this.imageContext.drawImage(this.image, 0, 0);
				break;
		}
		this.imageContext.restore();

		this.context.drawImage(this.imageCanvas, 0, 0);
	}

	ImageCropper.prototype._drawPreview = function()
	{
		for(var i = 0; i < this.previews.length; i++)
		{
			var preview = this.previews[i];
			preview.clearRect(0, 0, preview.canvas.width, preview.canvas.height);
			preview.save();
			preview.drawImage(this.imageCanvas, this.cropLeft, this.cropTop, this.cropViewWidth, this.cropViewHeight, 0, 0, preview.canvas.width, preview.canvas.height);
			preview.restore();
		}
	}

	ImageCropper.prototype._drawMask = function()
	{
		this._drawRect(this.imageViewLeft, this.imageViewTop, this.cropLeft-this.imageViewLeft, this.height, this.maskColor, null, this.maskAlpha);
		this._drawRect(this.cropLeft+this.cropViewWidth, this.imageViewTop, this.width-this.cropViewWidth-this.cropLeft+this.imageViewLeft, this.height, this.maskColor, null, this.maskAlpha);
		this._drawRect(this.cropLeft, this.imageViewTop, this.cropViewWidth, this.cropTop-this.imageViewTop, this.maskColor, null, this.maskAlpha);
		this._drawRect(this.cropLeft, this.cropTop+this.cropViewHeight, this.cropViewWidth, this.height-this.cropViewHeight-this.cropTop+this.imageViewTop, this.maskColor, null, this.maskAlpha);
	}

	ImageCropper.prototype._drawDragger = function()
	{
		this._drawRect(this.draggers.upperLeft.dragLeft, this.draggers.upperLeft.dragTop, this.dragSize, this.dragSize, null, this.dragColor, null);
		this._drawRect(this.draggers.upperRight.dragLeft, this.draggers.upperRight.dragTop, this.dragSize, this.dragSize, null, this.dragColor, null);
		this._drawRect(this.draggers.bottomLeft.dragLeft, this.draggers.bottomLeft.dragTop, this.dragSize, this.dragSize, null, this.dragColor, null);
		this._drawRect(this.draggers.bottomRight.dragLeft, this.draggers.bottomRight.dragTop, this.dragSize, this.dragSize, null, this.dragColor, null);
	}

	ImageCropper.prototype._drawRect = function(x, y, width, height, color, border, alpha)
	{
		this.context.save();
		if(color !== null) this.context.fillStyle = color;
		if(border !== null) this.context.strokeStyle = border;
		if(alpha !== null) this.context.globalAlpha = alpha;
		this.context.beginPath();
		this.context.rect(x, y, width, height);
		this.context.closePath();
		if(color !== null) this.context.fill();
		if(border !== null) this.context.stroke();
		this.context.restore();
	}

	ImageCropper.prototype.getCroppedImageData = function(width, height, mime)
	{
		var output = document.createElement("canvas");
		output.width = width || this.cropWidth;
		output.height = height || this.cropHeight;
		output.getContext("2d").drawImage(this.imageCanvas, this.cropLeft, this.cropTop, this.cropViewWidth, this.cropViewHeight, 0, 0, output.width, output.height);
		return output.toDataURL(mime || "image/jpeg");
	}

	ImageCropper.prototype.isAvaiable = function()
	{
		return typeof(FileReader) !== "undefined";
	}

	ImageCropper.prototype.isImage = function(file)
	{
		return (/image/i).test(file.type);
	}

})(window);
