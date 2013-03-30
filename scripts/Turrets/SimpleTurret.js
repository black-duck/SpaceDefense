factory['Turret'] = Class.extend({ 

	size: {
		x: 30,
		y: 40
	},
	
	pos: {
		x: 420,
		y: 550
	},

	dir: new Vec2(0,-1),

    angle: 0,
	//6 bullets per sec
	_fireRate: (1000/6),

	_fireTrigger: false,
	
	_fireCool: 0,

	img: assets['turret'],

    update: function() {
		
		this.dir.Set(InputEngine.mouse.x - this.pos.x,
					InputEngine.mouse.y - this.pos.y);
		this.dir.Normalize();

		//Must use dir insted
		if (this._fireTrigger && this._fireCool == 0) {
			this.__fire();
		}
		else if (this._fireCool >  0) {
			//coolDown 
			this._fireCool -= 1000/60
			if (this._fireCool < 0 ) {
				this._fireCool = 0;
			}
		}
    },

	draw: function(ctx) {
		var rad = Geometry.vecToRad(this.dir.x, this.dir.y);
		Drawer.image( this.img, this.pos.x, this.pos.y, rad, 
						this.size.x, this.size.y);
	},	

	//DRAFT-part START
	__fire: function() {

		GameEngine.spawn( new factory['Bullet'](
					this.pos.x + (this.size.x/2) * this.dir.x,
					this.pos.y + (this.size.y/2) * this.dir.y,
					this.dir.x,this.dir.y
				));

		SoundManager.playGun(0);
		this._fireCool = this._fireRate;
	

	}
	//DRAFT-part End
});
