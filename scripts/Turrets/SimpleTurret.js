factory['Turret'] = Class.extend({ 

    // Represents how many pixels correspond to a degree. 
    // A lower value corresponds to a more flexible turret.
    flexibility: 5,

	size: {
		x: 80,
		y: 80
	},
	
	pos: {
		x: 420,
		y: 600
	},

    angle: 0,

	img: assets['turret'],

    update: function() {
        // TODO: This needs work.
        this.angle = (InputEngine.mouse.x - canvas.width - 150) / this.flexibility;
    },

	draw: function(ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y, this.angle, 
						this.size.x, this.size.y);
		
	}	
});
