Drawer = {

	canvas: null ,
	ctx: null,

	_imgToAtlas: {},
	_atlas: {},
	
	xScale: 1,
	yScale: 1,
	xScaleHalf: 0.5,
	yScaleHalf: 0.5,

	init: function (canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

	},	

	useAtlas: function (atlasSrc) {
		var atlas = this._atlas;
		var imgToAtlas = this._imgToAtlas;
		
		//NOT trimmed, NOT rotated atlases
		Loader.load(atlasSrc + ".json", function (json) {
			
			Loader.preload(json.meta.image);
			atlas[atlasSrc] = json;
		
			var frames = json.frames;
			for (var i=0; i < frames.length; i++) {
				Drawer._imgToAtlas[frames[i].filename] = { img: json.meta.image,
													 frame: frames[i].frame };
			}	
		
		});	
		
	

	},
	setScale: function (x, y) {
		this.xScale = x;
		this.yScale = y;
		this.xScaleHalf = x/2;
		this.yScaleHalf = x/2;
	},
	__imageAltas3: function ( imgSrc, x, y) {

		var xs = this.xScale,
			ys = this.yScale,
			xsh = this.xScaleHalf,
			ysh = this.yScaleHalf;
		
		var atlas, img, frame;
		var ctx = this.ctx;

		atlas = this._imgToAtlas[imgSrc];
		img = Loader.load(atlas.img);
		f = atlas.frame;

		ctx.drawImage(img, f.x, f.y, 
							f.w, f.h, 
							x * xs, y * ys, 
							f.w * xsh, f.h * ysh);
	},
	__imageAtlas6: function (imgSrc, x, y, ang, w, h) {
			
		var xs = this.xScale,
			ys = this.yScale,
			xsh = this.xScaleHalf,
			ysh = this.yScaleHalf;

		var atlas, img, frame;
		var ctx = this.ctx;

		atlas = this._imgToAtlas[imgSrc];
		img = Loader.load(atlas.img);
		f = atlas.frame;

		ctx.save();
		ctx.translate(x * xs, y * ys);
		ctx.rotate(ang);
		ctx.drawImage( img, f.x, f.y,
							f.w, f.h,
							-(w * xsh), -(h * ysh), 
							w  * xs, h * ys);
		ctx.restore();

	},
	//overloaded method
	image: function (imgSrc, canvX , canvY) {

		if (this._imgToAtlas[imgSrc]) {
			
			//Work TODO
			if (arguments.length == 3) {
				this.__imageAtlas3(imgSrc, canvX, canvY);
			}
			else if (arguments.length == 6) {
				//better way to do it
				this.__imageAtlas6(imgSrc, canvX, canvY, 
						arguments[3], arguments[4], arguments[5]);
			}

			return ;

		}


		var canvRot, canvWidth, canvHeight, imgX, imgY, imgWidth, imgHeight;
		var img,ctx;
			
		ctx = this.ctx;
		img = Loader.load(imgSrc);
		
		var xScale = this.xScale,
			yScale = this.yScale,
			xScaleHalf = this.xScaleHalf,
			yScaleHalf = this.yScaleHalf;


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
	}

}
