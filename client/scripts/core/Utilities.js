Geometry = {

	vecToRad: function (x, y) {

		if (y < 0) {
			return -Math.atan(x/y);
		}
		else {
			return Math.PI-Math.atan(x/y);
		}

	},
	
	//Calculate the y in a polynomial expression . The array must be like this [an, an-1, an-2, ..., a3, a2, a1, a0].
	calcY: function(arrayP, x){
		var cal = arrayP[0];
		for(var i = 1; i < arrayP.length; i++){
			cal *= x;
			cal += arrayP[i];			
		}
		return cal;	
	}	

}
