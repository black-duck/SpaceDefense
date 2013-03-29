factory['Lifebar'] = Class.extend({


	_killed: false,

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

	duration: 500, //ms
	_entity: null, //associated entity, a ship enity for example

	init: function (entity, settings) {

		this._entity = entity;
		
		
		this.offset.x = -entity.size.x/2;
		this.offset.y = -entity.size.y/2 -this.size.y;
		
		this.pos.x = this._entity.pos.x + this.offset.x;	
		this.pos.y = this._entity.pos.y + this.offset.y;

	},

	update: function() {
		this.duration -= 1000/60;
		if (this.duration <= 0 || this._entity._killed ) {
			this.kill();
		}
		this.pos.x = this._entity.pos.x + this.offset.x;	
		this.pos.y = this._entity.pos.y + this.offset.y;

	},

	draw: function() {
		var ent = this._entity;
		var liferate = this._entity.hitpoints / 10;//DRAFT: hard coded value
		Drawer.rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 'green');
		Drawer.rect(this.pos.x, this.pos.y, liferate * this.size.x, this.size.y, 'green', 'green');
	},

	kill: function() {
		this._killed = true;
	}


});
