DELAY = 1000.0/60.0;
Logger = {};
Logger.log = console.log;
function loop() {
		var start = new Date();
		GameEngine.update();
		PhysicsEngine.update();
    	GameEngine.draw();

    	window.setTimeout(loop, DELAY - (new Date() - start)  );
}

function startGame() {
	var canvas = document.getElementById('canvas');
    
    // Do some initialization.
    InputEngine.setup(canvas);
    PhysicsEngine.init(); //PhysicsEngine must be init before GameEngine.
    GameEngine.init(canvas);
    Drawer.init(canvas);
    Gameplay.init();

    // And loop.
    loop();
}
