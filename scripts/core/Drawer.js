Drawer = {

	canvas: null ,
	ctx: null,
	imgToDraw: [],
	xScale: 1,
	yScale: 1,
	xScaleHalf: 0.5,
	yScaleHalf: 0.5,

	init: function (canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

	},	

	setScale: function (x, y) {
		this.xScale = x;
		this.yScale = y;
		this.xScaleHalf = x/2;
		this.yScaleHalf = x/2;
	},
	//overloaded method
	image: function (imgSrc, canvX , canvY) {

		var canvRot, canvWidth, canvHeight, imgX, imgY, imgWidth, imgHeight;
		var img,ctx;

		var xScale = this.xScale,
			yScale = this.yScale,
			xScaleHalf = this.xScaleHalf,
			yScaleHalf = this.yScaleHalf;

		ctx = this.ctx;
		img = Loader.load(imgSrc);
		
		if( arguments.length == 3) {
			ctx.drawImage(img, xScale * canvX, xScale * canvY);
		}
		else if( arguments.length == 4) {
			canvRot = arguments[3];

			ctx.save();
			ctx.translate(xScale * canvX, yScale * canvY);
			ctx.rotate(canvRot);
			ctx.drawImage( img, -(img.width * xScaleHalf ), -(img.height * yScaleHalf));
			ctx.restore();
		} 
		else if ( arguments.length == 5) {
			canvWidth =  arguments[3];
			canvHeight = arguments[4];
			ctx.drawImage(img, canvX * xScale -(canvWidth * xScaleHalf), 
								canvY * yScale -(canvHeight * yScaleHalf), 
								canvWidth * xScale, 
								canvHeight * yScale);
		
		}
		else if ( arguments.length == 6 ) {

			canvRot = arguments[3];
			canvWidth =  arguments[4];
			canvHeight = arguments[5];
			
			ctx.save();
			ctx.translate(canvX * xScale, canvY * yScale);
			ctx.rotate(canvRot);
			ctx.drawImage( img, -(canvWidth * xScaleHalf),
								-(canvWidth * yScaleHalf), 
								canvWidth  * xScale,
								canvHeight * yScale);
			ctx.restore();
		}
		else if ( arguments.length == 9 ) {
			imgX = arguments[1];
			imgY = arguments[2];
			imgWidth =  arguments[3];
			imgHeight = arguments[4];
			canvX = arguments[5];
			canvY = arguments[6];
			canvWidth = arguments[7];
			canvHeight = arguments[8];

			//not implemented yet
		}
		else if ( arguments.lenght == 10 ) {
			imgX = arguments[1];
			imgY = arguments[2];
			imgWidth =  arguments[3];
			imgHeight = arguments[4];
			canvX = arguments[5];
			canvY = arguments[6];
			canvRot = arguments[7];
			canvWidth = arguments[8];
			canvHeight = arguments[9];
			
			//not implemented yet
		}
		




	}

}
