
//DRAFT - to be modified area start
function fire(x,y) {

	GameEngine.spawn( new factory['Bullet'](GameEngine.canvas.width/2, 
											GameEngine.canvas.height,
											x, y));

}

assets = { 
	'background': 'img/black.jpg',
	'turret'	: 'img/turret.jpg',
	'ship' 		: 'img/ship.jpg',
	'bullet'	: 'img/bullet.jpg'
}

factory = {};

//DRAFT - to be modified area stop

GameEngine = { 

	ctx: null,
	canvas: null,

	Entities: [],

	draw: function () {

		var ctx = this.ctx;
		
		//DRAFT start
		ctx.drawImage( Loader.load(assets['background']),
						0, 0, 
						this.canvas.width, this.canvas.height);
		ctx.drawImage( Loader.load(assets['turret']),
						this.canvas.width/2, this.canvas.height- 50,
						50,50);
		//DRAFT end
		
		var ent = this.Entities;

		for ( i in ent ) {
			ent[i].draw(ctx);	
		}

	},
	update: function () {
		
		var ent = this.Entities;
		
		for ( i in ent ) {
			ent[i].update();	
		}

	},

	//spawn must use String of Classname as param
	spawn: function (Entity) {
		
		this.Entities.push(Entity); 

	},
	
	init: function (canvasId) {
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext('2d');
		Loader.preload(assets['background']);
	
	}
	
	

}



