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
//                gInputEngine.bind(81,'powerup-use');  //Q
//                gInputEngine.bind(69,'fire-superWeapon');  //E
                InputEngine.bind(32,'fire-primary');  //Space
//                gInputEngine.bind(16,'fire-missile');  //Shift   Ascii code=0 key code=16

			
                //event listeners
                 document.getElementById('canvas').addEventListener('click',InputEngine.onMouseClick,true);
                document.addEventListener('mousemove', InputEngine.onMouseMove,true);
                document.addEventListener('keydown', InputEngine.onKeyDown,true);
                document.addEventListener('keyup', InputEngine.onKeyUp,true);
        },
	onMouseClick:function(event){
		    console.log('click');
                    InputEngine.mouse.x = event.clientX;
                    InputEngine.mouse.y = event.clientY;
                    var action = InputEngine.bindings[32];
                    if (action) {
                          InputEngine.actions[action] = true;
                    }

	},
        //-----------------------------
        onMouseMove: function (event) {
                var posX = event.clientX;
                var posY = event.clientY;
				
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
