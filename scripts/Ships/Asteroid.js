
factory['Asteroid'] = Class.extend({ 

	_killed: false,

    physBody: null,

	speed: 60,
	hitpoints: 10,
	maxHitpoints: 10,

	size: {
		x: 85,
		y: 105
	},
	
	pos: {
		x: 0,
		y: 0
	},

	dir: new Vec2(1, 1),

    rotatedir: new Vec2(1, 1),

	img: 'img/asteroid.png',
	
    init: function(x, y, settings) {

		this.pos.x = x;
		this.pos.y = y;


		this.physBody = PhysicsEngine.addBody({
							
								id: 'Asteroid',
	                             x: x,
	                        	 y: y,
	                        	 userData: { id: 'Asteroid',
	                            	         ent: this 
	                                     },
	             				 angle: Geometry.vecToRad(this.rotatedir.x, this.rotatedir.y),
	                             halfWidth: this.size.x/2,
	                             halfHeight: this.size.y/2,

								 groups: ['aliens']
								 
	                        });     
		
		this.dir.Normalize();
		this.dir.Multiply(this.speed);
		this.physBody.SetLinearVelocity(this.dir);
		
	},

	update: function() {


        //getting angular rotation	
		var pAng = this.physBody.GetAngle();
		
        pAng += 0.0025;
		this.angle = pAng;
		this.rotatedir.Set(Math.cos(pAng - Math.PI/2), Math.sin(pAng -  Math.PI/2));
		this.rotatedir.Normalize();

		this.physBody.SetAngle(-Math.atan(this.rotatedir.x/this.rotatedir.y));
		this.physBody.SetLinearVelocity(this.dir);
		
		if (this.physBody != null) {
			var pPos = this.physBody.GetPosition();
			this.pos.x = pPos.x;
			this.pos.y = pPos.y;
		}

		if (this.hitpoints <= 0) {
			
			if (this.maxHitpoints > 2) {
			var clone1 = GameEngine.spawn( 
					new factory['Asteroid'](this.pos.x + 10, this.pos.y));
			clone1.dir.Set(this.dir.x,this.dir.y);
			clone1.size.x = this.size.x / 2;
			clone1.size.y = this.size.y / 2;
			clone1.maxHitpoints = this.maxHitpoints/3;
			clone1.hitpoints = this.maxHitpoints/3;
	
			var clone2 = GameEngine.spawn( 
					new factory['Asteroid'](this.pos.x - 10, this.pos.y));
			clone2.dir.Set(this.dir.x,this.dir.y);
			clone2.size.x = this.size.x / 2;
			clone2.size.y = this.size.y / 2;
			clone2.hitpoints = this.maxHitpoints/3;
			clone2.maxHitpoints = this.maxHitpoints/3;
			}
					
		this.kill();
		}

	},
    
	draw: function(ctx) {
		var rad = this.physBody.GetAngle();		
		
		Drawer.image(this.img, 
					 this.pos.x, this.pos.y, rad, 
					 this.size.x, this.size.y);
	
		
		this._frameIter = (this._frameIter + 0.2) % this.img.length;
	},
	
	damage: function(amount) {
		this.hitpoints -= amount;	
	},

	kill: function() {
		this._killed= true;	
	}
    

	
});
