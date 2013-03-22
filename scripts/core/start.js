GameEngine.init('canvas');

DELAY = 1000.0/60.0;


//DRAFT start
	GameEngine.spawn(factory['SimpleShip']);
//DRAFT end

(function () {
	function loop () {

		GameEngine.update();
		GameEngine.draw();
		window.setTimeout(loop, DELAY);
	}

	loop();
})();
