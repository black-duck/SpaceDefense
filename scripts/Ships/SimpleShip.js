

factory['SimpleShip'] = Class.extend({ 

	_killed: false,

    physBody: null,

	speed: 60,
	hitpoints: 10,

	size: {
		x: 38,
		y: 67
	},
	
	pos: {
		x: 0,
		y: 0
	},

	dir: {
		x: 0,
		y: 0
	},

	img: assets['ship'],

    init: function(sX, sY, eX, eY) {

		this.pos.x = sX;
		this.pos.y = sY;
		this.dir.x = eX;
		this.dir.y = eY;

		this.physBody = PhysicsEngine.addBody({
							
								id: 'SimpleShip',
	                             x: sX,
	                        	 y: sY,
	                        	 userData: { id: 'SimpleShip',
	                            	         ent: this 
	                                     },
	             				 angle: -Math.atan(this.dir.x/this.dir.y),
	                             halfWidth: this.size.x/2,
	                             halfHeight: this.size.y/2
	 
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
		this.physBody.SetAngle(-Math.atan(this.dir.x/this.dir.y));
		this.physBody.SetLinearVelocity(vec);
		
		if (this.physBody != null) {
			var pPos = this.physBody.GetPosition();
			this.pos.x = pPos.x;
			this.pos.y = pPos.y;
		}

		if (this.hitpoints <= 0) {
			this.kill();
		}

	},
    
	draw: function(ctx) {
		var rad = this.physBody.GetAngle();		
		Drawer.image( this.img, 
						this.pos.x, this.pos.y, rad, 
						this.size.x, this.size.y);

	},

	kill: function() {
		this._killed= true;	
	}
    

	
});
