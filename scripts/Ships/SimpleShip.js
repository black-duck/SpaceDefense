

factory['SimpleShip'] = Class.extend({ 

	_killed: false,

    physBody: null,
	lifeBar: null,

	speed: 60,

	hitpoints: 10,
	maxHitpoints: 10,

    // y axis values declaring the shooting range.
    startfire: 320,
    endfire: 400,
    preclusion: 100,

    _fireRate: (1000/1),
	_fireTrigger: true,
	_fireCool: 0,

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

    dirshoot: new Vec2(0,-1),

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

		this.lifeBar = GameEngine.spawn('Lifebar', this.pos.x, this.pos.x, 
										{ offset: {	x:-this.size.x/2, 
													y:-this.size.y/2 } 
										});

        
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1; 
        this.startfire += (Math.floor(Math.random() * (this.preclusion)) + 1) * plusOrMinus;
        this.endfire += (Math.floor(Math.random() * (this.preclusion)) + 1) * plusOrMinus;
	
	},

	update: function() {

        var pAng = this.physBody.GetAngle();
		
		this.angle = pAng;
		this.dirshoot.Set(Math.cos(pAng + Math.PI/2), Math.sin(pAng +  Math.PI/2));
		this.dirshoot.Normalize();


        var vec = new Vec2(this.dir.x, this.dir.y);
		vec.Normalize();
		vec.Multiply(this.speed);
		this.physBody.SetAngle(-Math.atan(this.dir.x/this.dir.y) / 3);
		this.physBody.SetLinearVelocity(vec);
		
		if (this.physBody != null) {
			var pPos = this.physBody.GetPosition();
			this.pos.x = pPos.x;
			this.pos.y = pPos.y;

			this.lifeBar.setPos(pPos.x, pPos.y);
		}

		if (this.hitpoints <= 0) {
			GameEngine.spawn('Explosion',this.pos.x, this.pos.y, 
													{ width: this.size.x,
													  height: this.size.y });
			this.kill();
		}
 
        if ((this.pos.y < this.endfire) && (this.pos.y > this.startfire)) {

            if (this._fireTrigger && this._fireCool == 0) {
			    this.__fire(); 
		    }
		    else if (this._fireCool >  0) {
                this._fireCool -= 1000/60
                if (this._fireCool < 0 ) {
                    this._fireCool = 0;
                }
		    }
        }
	},

    __fire: function() {

        GameEngine.spawn( 'Bullet',
					this.pos.x + (5 + this.size.x/2) * this.dirshoot.x,
					this.pos.y + (5 + this.size.y/2) * this.dirshoot.y,
					this.dirshoot.x,this.dirshoot.y, "red");
        
		SoundManager.playSound('sounds/LaserBeam1');
		this._fireCool = this._fireRate;
    },   
    
	draw: function(ctx) {
		var rad = this.physBody.GetAngle();		
		var frame = this.img[Math.floor(this._frameIter)] ;
		
		Drawer.image( frame, 
						this.pos.x, this.pos.y, rad, 
						this.size.x, this.size.y);
	
		
		this._frameIter = (this._frameIter + 0.2) % this.img.length;
	},
	
	damage: function(amount) {
        this.pos.y -= 3;
		this.hitpoints -= amount;
		this.lifeBar.setRatio(this.hitpoints/this.maxHitpoints);
		this.lifeBar.show();
	},

	kill: function() {
		this._killed= true;	
		this.lifeBar.kill();
	}
    

	
});
