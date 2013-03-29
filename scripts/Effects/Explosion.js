factory['Explosion'] = Class.extend({

	_killed: false,

	size: {
		x:8,
		y:8
	},
	
	pos: {
		x:0,
		y:0
	},

	duration: 250, //in ms

	frames: [],
	_animIter: 0,
	imgSrc: 'Explosion1',

	init: function(x, y, settings) {

		this.pos.x = x;
		this.pos.y = y;
		if (settings) {
			if (settings.width) this.size.x = settings.width;
			if (settings.height) this.size.y = settings.height;
		}
		this.frames = Drawer.getFrames(this.imgSrc);
		this.frames.sort();
	},

	update: function() {
		this.duration -= 1000/60;
		if (this.duration <= 0) {
			this.kill();
		}
	},
	
	draw: function() {
		
		var frame = this.frames[this._animIter];
		Drawer.image(frame, this.pos.x, this.pos.y, 
							this.size.x, this.size.y);
		this._animIter = (this._animIter + 1) % this.frames.length;
	},

	kill: function() {
		this._killed= true;
	}

});
