Drawer = {

	canvas: null ,
	ctx: null,
	imgToDraw: [],

	init: function (canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

	},

	//overloaded method
	image: function (imgSrc, canvX , canvY) {

		var canvRot, canvWidth, canvHeight, imgX, imgY, imgWidth, imgHeight;
		var img,ctx;

		ctx = this.ctx;
		img = Loader.load(imgSrc);
		
		if( arguments.length == 3) {
			ctx.drawImage(img, canvX, canvY);
		}
		else if( arguments.length == 4) {
			canvRot = arguments[3];

			ctx.save();
			ctx.translate(canvX, canvY);
			ctx.rotate(canvRot);
			ctx.drawImage( img, -(img.width/2), -(img.width/2));
			ctx.restore();
		} 
		else if ( arguments.length == 5) {
			canvWidth =  arguments[3];
			canvHeight = arguments[4];
			ctx.drawImage(img, canvX -(canvWidth/2), canvY -(canvHeight/2), 
							canvWidth, canvHeight);
		
		}
		else if ( arguments.length == 6 ) {

			canvRot = arguments[3];
			canvWidth =  arguments[4];
			canvHeight = arguments[5];
			
			ctx.save();
			ctx.translate(canvX, canvY);
			ctx.rotate(canvRot);
			ctx.drawImage( img, -(canvWidth/2), -(canvWidth/2), 
							canvWidth, canvHeight);
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

			this.ctx.drawImage(img, imgX, imgY, imgHeight, imgHeight, 
						canvX, canvY, canvWidth, canvHeight);
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
