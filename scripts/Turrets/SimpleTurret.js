factory['Turret'] = Class.extend({ 

	speed: 1,

	size: {
		x: 160,
		y: 80
	},
	
	pos: {
		x: 330,
		y: 520
	},

	moveTo: {
		x: 0,
		y: 0
	},

	img: assets['turret'],


    init: function() {
	
		
	
	},


	update: function() {

	
	},

	draw: function(ctx) {
		
		ctx.drawImage( Loader.load(this.img), 
						this.pos.x, this.pos.y, 
						this.size.x, this.size.y );

	}

	
});
