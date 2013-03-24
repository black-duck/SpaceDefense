InputEngine = {

        bindings: {},

        actions: {},

        mouse: {
                x: 0,
                y: 0
        },


		
        //-----------------------------
        setup: function (canvasId) {
		
				
                //move key bindings
                InputEngine.bind(87, 'look-up');
                InputEngine.bind(65, 'look-left');
                InputEngine.bind(83, 'look-down');
                InputEngine.bind(68, 'look-right');

                //fire key bindings
//             InputEngine.bind(81,'powerup-use');  //Q
//             InputEngine.bind(69,'fire-superWeapon');  //E
                InputEngine.bind(32,'fire-primary');  //Space
//             InputEngine.bind(16,'fire-missile');  //Shift   Ascii code=0 key code=16

			
                //event listeners
                document.getElementById('canvas').addEventListener('mousedown',InputEngine.onMouseDown,true);
                document.getElementById('canvas').addEventListener('mouseup',InputEngine.onMouseUp,true);
                document.getElementById('canvas').addEventListener('mousemove', InputEngine.onMouseMove,true);
                document.addEventListener('keydown', InputEngine.onKeyDown,true);
                document.addEventListener('keyup', InputEngine.onKeyUp,true);
        },
	onMouseDown:function(event){
		//  console.log('clickx: '+event.clientX+" clicky: "+event.clientY);
		if (event.button==2){return false;}
		InputEngine.mouse.x = event.clientX;
                InputEngine.mouse.y = event.clientY;
                var action = InputEngine.bindings[32];
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
                InputEngine.mouse.x = event.clientX;
               	InputEngine.mouse.y = event.clientY;
				
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
