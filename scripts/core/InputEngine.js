InputEngine = Class.extend({

        bindings: {},

        actions: {},

        mouse: {
                x: 0,
                y: 0
        },

        //-----------------------------
        setup: function (canvasID) {
                //move key bindings
                this.bind(87, 'look-up');
                this.bind(65, 'look-left');
                this.bind(83, 'look-down');
                this.bind(68, 'look-right');

                //fire key bindings
//                gInputEngine.bind(81,'powerup-use');  //Q
//                gInputEngine.bind(69,'fire-superWeapon');  //E
                this.bind(32,'fire-prmary');  //Space
//                gInputEngine.bind(16,'fire-missile');  //Shift   Ascii code=0 key code=16


                //event listeners
                document.getElementById('canvas').addEventListener('mousemove', gInputEngine.onMouseMove);
                document.getElementById('canvas').addEventListener('keydown', gInputEngine.onKeyDown);
                document.getElementById('canvas').addEventListener('keyup', gInputEngine.onKeyUp);
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

var gInputEngine = new InputEngine();
