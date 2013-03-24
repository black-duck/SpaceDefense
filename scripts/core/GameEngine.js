
//DRAFT - to be modified area start
Player0 = {
	turret: null

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
			Player0.turret._fireTrigger = true;	
		}
		else {
			Player0.turret._fireTrigger = false;	
		}
		if(InputEngine.actions['look-up']) {
			InputEngine.mouse.x=696;
			InputEngine.mouse.y=233;
		};
		if(InputEngine.actions['look-down']) {
			InputEngine.mouse.x=0;
			InputEngine.mouse.y=0;
		};
		if(InputEngine.actions['look-right']) {
			InputEngine.mouse.x=870;
			InputEngine.mouse.y=100
		};
		if(InputEngine.actions['look-left']) {
			InputEngine.mouse.x=511;
			InputEngine.mouse.y=134;
		};
		//DRAFT end

		
		var ent = this.Entities;
		
		for ( i in ent ) {
			ent[i].update();	
		}

	},

	//DRAFT spawn must use String of Classname as param
	spawn: function (Entity) {
		
		this.Entities.push(Entity); 
		return Entity;
	},
	
	init: function (canvas) {

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	
	}

}


