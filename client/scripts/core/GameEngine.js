//DRAFT - to be modified area start
Player0 = {
    playing: true,
	turret: null
}


assets = { 
	'background': 'img/stars.png',
	'turret'	: 'img/turret1.png',
	'ship' 		: 'img/ship.png',
	'bullet'	: 'img/bullet.png',
    'bullet-red': 'img/bullet-red.png'
}

factory = {};

//DRAFT - to be modified area stop

GameEngine = { 

	ctx: null,
	canvas: null,

	Entities: [],

	init: function (canvas) {

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		//DRAFT
		Drawer.useAtlas('atlas/atlas');
		
		PhysicsEngine.addContactListener({
			
			BeginContact: function(A,B) {
				if (A.GetUserData().ent.onImpact) {
					A.GetUserData().ent.onImpact(B.GetUserData().ent);
				}
				if (B.GetUserData().ent.onImpact) {
					B.GetUserData().ent.onImpact(A.GetUserData().ent);
				}
			}

		});
	},

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
			Player0.turret.turn(0);
		}
		else if(InputEngine.actions['look-right']) {
			Player0.turret.turn(Player0.turret.angle + Math.PI/48 );
		}
		else if(InputEngine.actions['look-left']) {
			Player0.turret.turn(Player0.turret.angle - Math.PI/48 );
		}
		else if(InputEngine.actions['mousemove']) {	
			Player0.turret.turn(
				Geometry.vecToRad(	InputEngine.mouse.x - Player0.turret.pos.x,
									InputEngine.mouse.y - Player0.turret.pos.y)
				);
			//Draft inner InputEngine function
			InputEngine.actions['mousemove'] = false;
		}

		var ent = this.Entities;
		var dead = [];	

		for (var i=ent.length; i-- ; i) {
		
			if (ent[i]._killed === true) {
				dead.push(i);
			} 
			else {
				ent[i].update();	
			}
		}

		for (var i=0; i < dead.length; i++) {
			
			if (ent[dead[i]].physBody) {
				PhysicsEngine.removeBodyAsObj(ent[dead[i]].physBody);			
			}
			ent.splice(dead[i], 1);

		}

	},

	
	spawn: function (entityName) {
	
		var args = Array.prototype.slice.call(arguments, 1);

		var Temp = function(){}
		var inst, ent;

		Temp.prototype = factory[entityName].prototype;
		inst = new Temp;
		ent = factory[entityName].apply(inst, args); 
		
		this.Entities.push(ent);
		return ent;
	},
	

	removeEntity: function(ent) {

		ent._killed = true;
	}

}
