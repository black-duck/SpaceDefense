
//DRAFT - to be modified area start
function fire(x,y) {

	GameEngine.spawn( new factory['Bullet'](GameEngine.canvas.width/2,GameEngine.canvas.height,x, y));

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
		//DRAFT end
		
		var ent = this.Entities;

		for ( i in ent ) {
			ent[i].draw(ctx);	
		}

	},
	update: function () {
		
		//DRAFT start
		if(InputEngine.actions['fire-primary']) {
			var normal={};
			//draft normalize of mouse coordinates for visual result
			normal.x=InputEngine.mouse.x-InputEngine.mouse.x-1;
			normal.y=InputEngine.mouse.y-InputEngine.mouse.y-1;
			//normalize(gInputEngine.mouse.x,gInputEngine.mouse.y);
			//console.log("normal:"+normal.x);		
			//end of draft
			fire(normal.x,normal.y);
			InputEngine.actions['fire-primary']=false;
		}		
		//DRAFT end


		var ent = this.Entities;
		
		for ( i in ent ) {
			ent[i].update();	
		}

	},

	//spawn must use String of Classname as param
	spawn: function (Entity) {
		
		this.Entities.push(Entity); 

	},
	
	init: function (canvas) {

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	
	}

}


