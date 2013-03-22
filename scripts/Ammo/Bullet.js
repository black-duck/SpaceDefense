
factory['Bullet'] = Class.extend({ 

	speed: 2,

	size: {
		x: 5,
		y: 5
	},
	
	pos: {
		x: 0,
		y: 0
	},

	moveTo: {
		x: 0,
		y: 0
	},

	img: assets['bullet'],

	init: function(Sx,Sy,Ex,Ey) {
	
		this.pos.x = Sx;
		this.pos.y = Sy;
		this.moveTo.x = Ex;
		this.moveTo.y = Ey;
	
	},

	update: function() {
		//DRAFT- we will use physic engine insted
		if ( this.pos.x > this.moveTo.x ) {
			this.pos.x -= this.speed;

		}
		else if ( this.pos.x < this.moveTo.x ) {
			 this.pos.x += this.speed;
		}
		
		if ( this.pos.y > this.moveTo.y ) {
			 this.pos.y -= this.speed;

		}
		else if ( this.pos.y < this.moveTo.y ) {
			  this.pos.y += this.speed;
		}
		//DRAFT end
	
	},

	draw: function(ctx) {
		
		ctx.drawImage( Loader.load(this.img), 
						this.pos.x, this.pos.y, 
						this.size.x, this.size.y );

	}

	
});
