factory['Turret'] = Class.extend({ 

    // Represents how many pixels correspond to a degree. 
    // A lower value corresponds to a more flexible turret.
    flexibility: 6,

	size: {
		x: 160,
		y: 80
	},
	
	pos: {
		x: 400,
		y: 520
	},

    angle: 30,

	img: assets['turret'],

    update: function() {
        this.angle = (gInputEngine.mouse.x - canvas.width / 2) / this.flexibility;
    },

	draw: function(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);         
        ctx.rotate(this.angle * Math.PI/180);            
        ctx.drawImage(Loader.load(this.img), -(this.size.x/2), -(this.size.y/2), this.size.x, this.size.y); 
        ctx.restore();
	} 

	
});
