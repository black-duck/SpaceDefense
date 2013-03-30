// Used to calculate framesInterval.
var beforeFrame = 0;
var afterFrame = 0;
var framesInterval = 0;

DELAY = 1000.0/60.0;
Logger = {};
Logger.log = console.log;
function loop() {

    beforeFrame = new Date();

    GameEngine.update();
    PhysicsEngine.update();
    Gameplay.update();
    GameEngine.draw();

    afterFrame = new Date();
    framesInterval = afterFrame - beforeFrame;

    window.setTimeout(loop, DELAY - framesInterval);
}

function startGame() {
	var canvas = document.getElementById('canvas');

    // Do some initialization.
    InputEngine.setup(canvas);
    PhysicsEngine.init(); //PhysicsEngine must be init before GameEngine.
    GameEngine.init(canvas);
    Drawer.init(canvas);
	Drawer.setScale(canvas.width/800, canvas.width/800);
	Scale.setScale(1/(canvas.width/800), 1/(canvas.width/800));
    Gameplay.init();

    // And loop.
    loop();
}
