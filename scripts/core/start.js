DELAY = 1000.0/60.0;

function loop() {
    GameEngine.update();
	PhysicsEngine.update();
    GameEngine.draw();
    window.setTimeout(loop, DELAY);
}

function startGame() {
	var canvas = document.getElementById('canvas');
    //DRAFT start
    GameEngine.spawn(new factory['SimpleShip']());
    Player0.turret = GameEngine.spawn(new factory['Turret']());
    InputEngine.setup(canvas);
    //DRAFT end


   
    
    GameEngine.init(canvas);
    Drawer.init(canvas);
	PhysicsEngine.init();

    loop();
}
