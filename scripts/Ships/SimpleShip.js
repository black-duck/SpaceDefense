

factory['SimpleShip'] = Class.extend({ 


    physBody: null,
	speed: 60,
	_killed: false,

	size: {
		x: 80,
		y: 100
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
		this.physBody.SetLinearVelocity(vec);
		
		if (this.physBody != null) {
			var pPos = this.physBody.GetPosition();
			this.pos.x = pPos.x;
			this.pos.y = pPos.y;
		}

	},
    
	draw: function(ctx) {
		
		ctx.drawImage( Loader.load(this.img), 
						this.pos.x, this.pos.y, 
						this.size.x, this.size.y );

	},

	kill: function() {
		this._killed= true;	
	}
    

	
});
