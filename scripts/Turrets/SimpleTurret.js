factory['Turret'] = Class.extend({ 

    // Represents how many pixels correspond to a degree. 
    // A lower value corresponds to a more flexible turret.
    flexibility: 6,

	size: {
		x: 80,
		y: 80
	},
	
	pos: {
		x: 400,
		y: 520
	},

    angle: 30,

	img: assets['turret'],

    update: function(ctx) {
        this.angle = (gInputEngine.mouse.x - canvas.width / 2) / this.flexibility;
    },

	draw: function(ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y, this.angle, 
						this.size.x, this.size.y);
		
	}	
});
