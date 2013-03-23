GameEngine.init('canvas');

DELAY = 1000.0/60.0;


//DRAFT start
	GameEngine.spawn(new factory['SimpleShip']());
    GameEngine.spawn(new factory['Turret']());
    gInputEngine.setup();


//DRAFT end

(function () {
	function loop () {

		GameEngine.update();
		GameEngine.draw();
		window.setTimeout(loop, DELAY);
	}

	loop();
})();
