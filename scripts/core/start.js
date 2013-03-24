DELAY = 1000.0/60.0;

function loop() {
		var start = new Date();
		GameEngine.update();
		PhysicsEngine.update();
    	GameEngine.draw();

    	window.setTimeout(loop, DELAY - (new Date() - start)  );
}

function startGame() {
	var canvas = document.getElementById('canvas');

    	//DRAFT start
    	Player0.turret = GameEngine.spawn(new factory['Turret']());
    	InputEngine.setup(canvas);
    	//DRAFT end

    	GameEngine.init(canvas);
    	Drawer.init(canvas);
	PhysicsEngine.init();

    loop();
}
