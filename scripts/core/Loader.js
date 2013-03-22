Loader = {
	images: {},
	sounds: {},
	objects: {},
	
	_loadImg: function(src) { 
		var imageCache = Loader.images;
		var img = new Image();
		
		img.onload = function() { 			
			imageCache[src] = img;
		};
		img.src = src;
		return img;

	},
	preload: function(src) {
		this._loadImg(src);
	},
	load: function(src) {
		
		var imageCache = Loader.images;
		
		if (!imageCache[src]) {
			var img = this._loadImg(src);
		}
		else {
			var img =  imageCache[src];
		}
		return img;
	}
}
	
