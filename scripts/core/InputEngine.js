Scale={
  x:1.0,
  y:1.0,
  setScale:function(ScaleX,ScaleY){
    Scale.x=ScaleX;
    Scale.y=ScaleY;
  }
};
InputEngine = {

        bindings: {},

        actions: {},

        mouse: {
                x: 0,
                y: 0
        },


		
        //-----------------------------
        setup: function (canvas) {
		
				
                //move key bindings
                InputEngine.bind(87, 'look-up');
                InputEngine.bind(65, 'look-left');
                InputEngine.bind(68, 'look-right');

                //fire key bindings
//             InputEngine.bind(81,'powerup-use');  //Q
//             InputEngine.bind(69,'fire-superWeapon');  //E
                InputEngine.bind(32,'fire-primary');  //Space
//             InputEngine.bind(16,'fire-missile');  //Shift   Ascii code=0 key code=16

			
                //event listeners
                canvas.addEventListener('mousedown',InputEngine.onMouseDown,true);
		canvas.addEventListener('mouseout',InputEngine.onMouseUp,true);
                canvas.addEventListener('mouseup',InputEngine.onMouseUp,true);
                canvas.addEventListener('mousemove', InputEngine.onMouseMove,true);
                document.addEventListener('keydown', InputEngine.onKeyDown,true);
                document.addEventListener('keyup', InputEngine.onKeyUp,true);
        },
	onMouseDown:function(event){
 		var action = InputEngine.bindings[32];
		if (event.button==2){
			InputEngine.actions[action] = false;
			return false;
		}
 		var rect = document.getElementById('canvas').getBoundingClientRect();
		InputEngine.mouse.x = (event.clientX-rect.left)*Scale.x;
        InputEngine.mouse.y = (event.clientY-rect.top)*Scale.y;
		
		if (action) {
        	InputEngine.actions[action] = true;
        }
	},
	onMouseUp:function(event){
		var action = InputEngine.bindings[32];
                if (action) {
                      InputEngine.actions[action] = false;
                }
	},
        //-----------------------------
        onMouseMove: function (event) {
        	var rect = document.getElementById('canvas').getBoundingClientRect();
			InputEngine.mouse.x = (event.clientX-rect.left) * Scale.x;
            InputEngine.mouse.y = (event.clientY-rect.top) * Scale.y;	
        },


        //-----------------------------
        onKeyDown: function (event) {
				
                var action = InputEngine.bindings[event.keyCode];
				console.log( event.keyCode );
                if (action) {
                        InputEngine.actions[action] = true;
						
                }
        },

   //-----------------------------
        onKeyUp: function (event) {

                var action = InputEngine.bindings[event.keyCode];

                if (action) {
                        InputEngine.actions[action] = false;
						
                }
        },

        //-----------------------------
        bind: function (key, action) {
                InputEngine.bindings[key] = action;
				
        }

};
