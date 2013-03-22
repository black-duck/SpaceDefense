InputEngineClass = Class.extend({

        bindings: {},

        actions: {},

        mouse: {
                x: 0,
                y: 0
        },

        //-----------------------------
        setup: function () {
                //move key bindings
                gInputEngine.bind(87, 'look-up');
                gInputEngine.bind(65, 'look-left');
                gInputEngine.bind(83, 'look-down');
                gInputEngine.bind(68, 'look-right');

                //fire key bindings
//                gInputEngine.bind(81,'powerup-use');  //Q
//                gInputEngine.bind(69,'fire-superWeapon');  //E
                gInputEngine.bind(32,'fire-prmary');  //Space
//                gInputEngine.bind(16,'fire-missile');  //Shift   Ascii code=0 key code=16


                //event listeners
                document.getElementById('spaceCanvas').addEventListener('mousemove', gInputEngine.onMouseMove);
                document.getElementById('spaceCanvas').addEventListener('keydown', gInputEngine.onKeyDown);
                document.getElementById('spaceCanvas').addEventListener('keyup', gInputEngine.onKeyUp);
        },

        //-----------------------------
        onMouseMove: function (event) {
                gInputEngine.mouse.x = event.clientX;
                gInputEngine.mouse.y = event.clientY;
        },

        //-----------------------------
        onKeyDown: function (event) {

                var action = gInputEngine.bindings[event.keyID];

                if (action) {
                        gInputEngine.actions[action] = true;
                }
        },

   //-----------------------------
        onKeyUp: function (event) {

                var action = gInputEngine.bindings[event.keyID];

                if (action) {
                        gInputEngine.actions[action] = false;
                }
        },

        //-----------------------------
        bind: function (key, action) {
                gInputEngine.bindings[key] = action;
        }

});

gInputEngine = new InputEngineClass();
