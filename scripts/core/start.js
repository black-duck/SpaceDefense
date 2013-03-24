DELAY = 1000.0/60.0;

function loop() {
    GameEngine.update();
	PhysicsEngine.update();
    GameEngine.draw();
    window.setTimeout(loop, DELAY);
}

function startGame() {
	var canvas = document.getElementById('canvas');

    // Do some initialization.
    InputEngine.setup(canvas);
    GameEngine.init(canvas);
    Drawer.init(canvas);
    PhysicsEngine.init();
    Gameplay.init();    

    // And loop.
    loop();
}
