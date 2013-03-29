factory['Lifebar'] = Class.extend({


	_killed: false,

	_hidden: false,

	size: {
		x:40,
		y:8
	},

	width: 40,
	height: 8,

	offset: {
		x: 0,
		y: 0
	},

	pos: {
		x:0,
		y:0
	},

	duration: 500, //in ms. Duration until hide()
	liferatio: 0, //[0-1]

	init: function (x, y, settings) {
		
		this.offset.x = 0;
		this.offset.y = -this.size.y;
	
		if (settings) {
			if (settings.offset) this.offset.x = settings.offset.x;	
			if (settings.offset) this.offset.y = settings.offset.y - this.size.y;
		}

		this._hidden = true;
	},

	update: function() {
		this.duration -= 1000/60;
		if (this.duration <= 0) {
			this.hide();
		}
	},

	draw: function() {
		if (!this._hidden) {	
			Drawer.rect(this.pos.x, this.pos.y, this.width, this.height, 'green');
			Drawer.rect(this.pos.x, this.pos.y, this.liferatio * this.size.x, this.size.y, 'green', 'green');
		}
	},

	setPos: function(x, y) {
		this.pos.x = x + this.offset.x;
		this.pos.y = y + this.offset.y;
	},

	setRatio: function(ratio) {
		this.liferatio = ratio;
	},

	show: function() {
		this.duration = 500;
		this._hidden = false;
	},

	hide: function() {
		this._hidden = true;
	},

	kill: function() {
		this._killed = true;
	}


});
