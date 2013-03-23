PHYSICS_LOOP_HZ = 1000/60.0;

Vec2 = Box2D.Common.Math.b2Vec2;
BodyDef =  Box2D.Dynamics.b2BodyDef;
Body =  Box2D.Dynamics.b2Body;
FixtureDef =  Box2D.Dynamics.b2FixtureDef;
Fixture =  Box2D.Dynamics.b2Fixture;
World =  Box2D.Dynamics.b2World;
MassData = Box2D.Collision.Shapes.b2MassData;
PolygonShape =  Box2D.Collision.Shapes.b2PolygonShape;
CircleShape = Box2D.Collision.Shapes.b2CircleShape;
DebugDraw =  Box2D.Dynamics.b2DebugDraw;
RevoluteJointDef =  Box2D.Dynamics.Joints.b2RevoluteJointDef;


PhysicsEngine = {
  
	world: null,
  
	init: function () {
	
		this.world = new World(
    		new Vec2(0, 0), //gravity    						
    		false ); //don't allow sleep

	},


	addContactListener: function (callbacks) {

    	var listener = new Box2D.Dynamics.b2ContactListener;
    	
		if (callbacks.BeginContact) listener.BeginContact = function (contact) {
      		callbacks.BeginContact(contact.GetFixtureA().GetBody(), 
									contact.GetFixtureB().GetBody());
    	}

    	if (callbacks.EndContact) listener.EndContact = function (contact) {
      		callbacks.EndContact(contact.GetFixtureA().GetBody(), 
								contact.GetFixtureB().GetBody());
    	}
    
		if (callbacks.PostSolve) listener.PostSolve = function (contact, impulse) {
      		callbacks.PostSolve(contact.GetFixtureA().GetBody(), 
								contact.GetFixtureB().GetBody(), 
								impulse.normalImpulses[0]);
    	}

    	this.world.SetContactListener(listener);
  	},

	update: function () {
 		
		var start = Date.now();
    	this.world.Step(
    				PHYSICS_LOOP_HZ, //frame-rate
    				10, //velocity iterations
    				10); //position iterations
    
		this.world.ClearForces();
    	return (Date.now() - start);
	},

	registerBody: function (bodyDef) {
    	var body = this.world.CreateBody(bodyDef);
    	return body;
	},

	addBody: function (entityDef) {
 
		var bodyDef = new BodyDef;

    	var id = entityDef.id;

    	if (entityDef.type == 'static') {
			bodyDef.type = Body.b2_staticBody;
    	} 
		else {
      		bodyDef.type = Body.b2_dynamicBody;
    	}

    	bodyDef.position.x = entityDef.x;
    	bodyDef.position.y = entityDef.y;
    
		if (entityDef.userData) bodyDef.userData = entityDef.userData;
    	if (entityDef.angle) bodyDef.angle = entityDef.angle;
    	if (entityDef.damping) bodyDef.linearDamping = entityDef.damping;
    	
		var body = this.registerBody(bodyDef);
		var fixtureDefinition = new FixtureDef;

		fixtureDefinition.density = 1.0;
		fixtureDefinition.friction = 0; 
		fixtureDefinition.restitution = 0; 

		fixtureDefinition.shape = new PolygonShape;
		fixtureDefinition.shape.SetAsBox(entityDef.halfWidth, entityDef.halfHeight);
		
		body.CreateFixture(fixtureDefinition);

		return body;

	},

	removeBodyAsObj: function (obj) {

		this.world.DestroyBody(obj);
	},
  
	setVelocity: function (bodyId, x, y) {
    	var body = this.bodiesMap[bodyId];
    	body.SetLinearVelocity(new Vec2(x, y));
	},

	getVelocity: function (body) {
    	return body.GetLinearVelocity();
	},

	getPosition: function (body) {
    	return body.GetPosition();
	},

	setPosition: function (body, pos) {
    	body.SetPosition(pos);
  	},

};

