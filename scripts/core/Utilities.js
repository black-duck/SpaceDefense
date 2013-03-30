Geometry = {

	vecToRad: function (x, y) {

		if (y < 0) {
			return -Math.atan(x/y);
		}
		else {
			return Math.PI-Math.atan(x/y);
		}

	}
	
	
	

}
