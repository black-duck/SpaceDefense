

factory['SimpleShip'] = Class.extend({ 

	_killed: false,

    physBody: null,
	lifeBar: null,

	speed: 60,

	hitpoints: 10,
	maxHitpoints: 10,

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

	img: ['ship.png','ship2.png'],
	_frameIter: 0,
	
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
	             				 angle: Geometry.vecToRad(this.dir.x, this.dir.y),
	                             halfWidth: this.size.x/2,
	                             halfHeight: this.size.y/2,
								 
							     groups: ['aliens'],
								 collidesWith: ['humans','aliens']
	                        });     
		
		var vec = new Vec2(this.dir.x, this.dir.y);
		vec.Normalize();
		vec.Multiply(this.speed);
		this.physBody.SetLinearVelocity(vec);

		this.lifeBar = GameEngine.spawn( 
				new factory.Lifebar( this.pos.x, this.pos.x, 
									{ offset: {	x:-this.size.x/2, 
												y:-this.size.y/2 } 
									})
				);
	
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

			this.lifeBar.setPos(pPos.x, pPos.y);
		}

		if (this.hitpoints <= 0) {
			GameEngine.spawn( new factory['Explosion'](this.pos.x, this.pos.y, 
														{width: this.size.x,
															height: this.size.y}
							
												) );
			this.kill();
		}

	},
    
	draw: function(ctx) {
		var rad = this.physBody.GetAngle();		
		var frame = this.img[Math.floor(this._frameIter)] ;
		
		Drawer.image( frame, 
						this.pos.x, this.pos.y, rad / 2, 
						this.size.x, this.size.y);
	
		
		this._frameIter = (this._frameIter + 0.2) % this.img.length;
	},
	
	damage: function(amount) {
		this.hitpoints -= amount;
		this.lifeBar.setRatio(this.hitpoints/this.maxHitpoints);
		this.lifeBar.show();
	},

	kill: function() {
		this._killed= true;	
		this.lifeBar.kill();
	}
    

	
});
