Geometry = {

	vecToRad: function (x, y) {

		if (y < 0) {
			return -Math.atan(x/y);
		}
		else {
			return Math.PI-Math.atan(x/y);
		}

	},

	//Finds if the sortest way to rotate from point a to b  
	//is left or rigth
	//
	//a,b params in radius
	//
	//returns -1 for left rotation
	//returns  1 for rigth rotation
	//
	rotationDir: function (a, b) {
		a = (a + 2*Math.PI) % 2*Math.PI;
		b = (b + 2*Math.PI) % 2*Math.PI;

		b = b - a;
		b = (b + 2*Math.PI) % 2*Math.PI;
		if ( b < Math.PI ) {
			return -1;
		}
		else if ( b > Math.PI) {
			return 1;
		}
		else {
			return 0;
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
