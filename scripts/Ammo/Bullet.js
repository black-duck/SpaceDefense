
factory['Bullet'] = Class.extend({ 

	physBody: null,
	speed: 800,
	lifetime: 5000,
	_killed: false,

	size: {
		x: 5,
		y: 10
	},
	
	pos: {
		x: 0,
		y: 0
	},

	dir: {
		x: 0,
		y: 0
	},


	img: assets['bullet'],

	init: function(sX, sY, eX, eY) {

		this.pos.x = sX;
		this.pos.y = sY;
		this.dir.x = eX;
		this.dir.y = eY;

		this.physBody = PhysicsEngine.addBody({
							
								id: 'bullet',
	                             x: sX,
	                        	 y: sY,
								 damping: 0,
								 bullet: true,
	                        	 userData: { id: 'bullet',
	                            	         ent: this 
	                                     },
	            				 angle: -Math.atan(this.dir.x/this.dir.y), 
	                             halfWidth: this.size.y/2,
	                             halfHeight: this.size.x/2
	 
	                        });     
		
		var vec = new Vec2(this.dir.x, this.dir.y);
		vec.Normalize();
		vec.Multiply(this.speed);
		this.physBody.SetLinearVelocity(vec);
	
	},

	update: function() {
		 
		var vec = new Vec2(this.dir.x, this.dir.y);
		vec.Normalize();
		vec.Multiply(this.speed);
		this.physBody.SetLinearVelocity(vec);
		
		if (this.physBody != null) {
			var pPos = this.physBody.GetPosition();
			this.pos.x = pPos.x;
			this.pos.y = pPos.y;
		}
		if (this.lifetime <= 0) {
			this.kill();
		}
		else {
			this.lifetime -= 1000/60;
		}

	},

	kill: function () {
		this._killed= true;
	},

	draw: function(ctx) {
		var rad = this.physBody.GetAngle();	
		Drawer.image( this.img, 
						this.pos.x, this.pos.y, rad, 
						this.size.x, this.size.y );

	}

	
});
