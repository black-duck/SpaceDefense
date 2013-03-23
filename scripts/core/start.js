
DELAY = 1000.0/60.0;

function loop() {
    GameEngine.update();
	PhysicsEngine.update();
    GameEngine.draw();
    window.setTimeout(loop, DELAY);
}

function startGame() {

    //DRAFT start
    GameEngine.spawn(new factory['SimpleShip']());
    GameEngine.spawn(new factory['Turret']());
    gInputEngine.setup();
    //DRAFT end


    var canvas = document.getElementById('canvas');
    
    GameEngine.init(canvas);
    Drawer.init(canvas);
	PhysicsEngine.init();

    loop();
}
