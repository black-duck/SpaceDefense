Loader = {
	FILE_EXT: {
		sound: /(.mp3|.ogg)$/,
		image: /(.jpg|.jpeg|.png)/
	},
	images: {},
	sounds: {},
	objects: {},
	
	_loadImg: function(src) { 
		var imageCache = Loader.images;
		
		if (imageCache[src]) {
			return  imageCache[src];
		}

		var img = new Image();

		img.onload = function() { 			
			imageCache[src] = img;
		};
	
		img.src = src;
		return img;

	},

	_loadSound: function(src) {
		var soundCache = Loader.sounds;
		
		if (soundCache[src]) {
			return soundCache[src];
		}
		
		var audio = new Audio();
		
		audio.onload = function() {
			soundCache[src] = audio;
		};
		audio.preload = 'auto';
		audio.src = src;
		return audio;

	},

	preload: function(src) {
		var ext = this.FILE_EXT;
		
		if (ext.images.test(src)) {
			this._loadImg(src);
		}
		else if (ext.sounds.test()){
			this._loadSound(src);
		}
	},

	load: function(src) {
		
		var ext = this.FILE_EXT;
		
		if (ext.image.test(src)) {
			return this._loadImg(src);
		}
		else if (ext.sound.test(src)){
			return this._loadSound(src);
		}

	}
}
	
