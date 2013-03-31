factory['Turret'] = Class.extend({ 

	_killed: false,
	
	physBody: null,

	size: {
		x: 60,
		y: 100
	},

	width: 60,
	height: 100,
	
	pos: {
		x: 420,
		y: 500
	},

	dir: new Vec2(0,-1),

    angle: 0,
	targetAngle: 0,
	rotationSpeed: 2.1,

	//6 bullets per sec
	_fireRate: (1000/6),
	_fireTrigger: false,
	_fireCool: 0,

	energy: 120,
	maxEnergy: 150,
	regen: 0.8,

	img: assets['turret'],

	init: function( x, y, settings) {
	
		x = this.pos.x;
		y = this.pos.y;
		this.physBody = PhysicsEngine.addBody({
						
						id: 'Turret',
						x: x,
						y: y,
						userData: { id: 'Turret',
									ent: this },
						angle: Geometry.vecToRad(this.dir.x, this.dir.y),
						halfWidth: this.width/2,
						halfHeight: this.height/2,
						
						group: ['humans'],
						collidesWith: ['aliens']
		});



	},

    update: function() {
		
		//getting angular rotation	
		var pAng = this.physBody.GetAngle();
		
		this.angle = pAng;
		this.dir.Set(Math.cos(pAng - Math.PI/2), Math.sin(pAng -  Math.PI/2));
		this.dir.Normalize();
		
		if (this.energy <= this.maxEnergy/4) {
			this.energy += this.regen/2;
		}
		else {
			this.energy += this.regen;
		}  
		if (this.energy > this.maxEnergy) {
			this.energy = this.maxEnergy;
		}
		//Must use dir insted
		if (this._fireTrigger && this._fireCool == 0 && this.energy - 10 > 0) {
			this.energy -= 10;//DRAFT LINE: hardcoded value
			if (this.energy < 0) {
				this.energy = 0;
			}
			this.__fire();
		}
		else if (this._fireCool >  0) {
			//coolDown 
			this._fireCool -= 1000/60
			if (this._fireCool < 0 ) {
				this._fireCool = 0;
			}
		}
		
		//Turn physic body
		if (this.targetAngle > this.angle) {
			this.physBody.SetAngularVelocity(this.rotationSpeed);
		}
		else if (this.targetAngle < this.angle) {
			this.physBody.SetAngularVelocity(-this.rotationSpeed);
		}
		else {
			this.physBody.SetAngularVelocity(0);
		}

    },

	draw: function (ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y, this.angle, 
						this.size.x, this.size.y);
	},	

	turn: function (rads) {
		this.targetAngle = rads % (2*Math.PI);
	},

	startFire: function() {
		this._fireTrigger = true;
	},
	stopFire: function() {
		this._fireTrigger = false;
	},
	//DRAFT-part START
	__fire: function() {

		GameEngine.spawn( new factory['Bullet'](
					this.pos.x + (5 + this.size.x/2) * this.dir.x,
					this.pos.y + (5 + this.size.y/2) * this.dir.y,
					this.dir.x,this.dir.y
				));

		SoundManager.playSound('sounds/LaserBeam0');
		this._fireCool = this._fireRate;
	

	}
	//DRAFT-part End
});
