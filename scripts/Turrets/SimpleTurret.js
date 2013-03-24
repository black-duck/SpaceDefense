factory['Turret'] = Class.extend({ 

    // Represents how many pixels correspond to a degree. 
    // A lower value corresponds to a more flexible turret.
    flexibility: 5,

	size: {
		x: 80,
		y: 80
	},
	
	pos: {
		x: 420,
		y: 600
	},

	dir: {
		x: -1,
		y: -1
	},

    angle: 0,
	//6 bullets per sec
	_fireRate: (1000/6),

	_fireTrigger: false,
	
	_fireCool: 0,

	img: assets['turret'],

    update: function() {
        // TODO: This needs work. 
        this.angle = (InputEngine.mouse.x - canvas.width +110) / this.flexibility;
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
		Drawer.image( this.img, this.pos.x, this.pos.y, this.angle, 
						this.size.x, this.size.y);
		
	},	

	//DRAFT-part START
	__fire: function() {
		GameEngine.spawn( new factory['Bullet'](this.pos.x,this.pos.y,
													this.dir.x,this.dir.y));
		SoundManager.playSound('sounds/LaserBeam0');
		this._fireCool = this._fireRate;
	

	}
	//DRAFT-part End
});
