Gameplay = {

    entries: {
        1: {
            x: 50,
            y: -10
        },
        2: {
            x: 400,
            y: -10
        },
        3: {
            x: 750,
            y: -10
        }
    },

    exits: {
        1: {
            x: 1,
            y: 500
        },

        2: {
            x: 800,
            y: 500
        }
    },   
      

    update: function () {
    },


    _getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    _setIntervalX: function(callback, delay, repetitions) {
        var x = 0;
        var intervalID = window.setInterval(function () {

           callback();

            if (++x === repetitions) {
               window.clearInterval(intervalID);
            }
        }, delay);
    }, 

    // A single spawn method. 
    // Normally, you won't use this, but MultipleSpawnNPC() instead.
    SingleSpawnNPC: function(npc) {
        if (arguments.length == 1) {
            rand = this._getRandomInt(1,3); 
            entry = this.entries[rand];
            rand = this._getRandomInt(1,2); 
            exit = this.exits[rand];
        }
        else if (arguments.length == 3) {
            entry = arguments[1];
            exit = arguments[2];
        }

        GameEngine.spawn(new factory[npc](entry.x, entry.y, exit.x - entry.x, exit.y - entry.y));
    }, 

    // Multiple spawn.
    //
    // Usages:
    //
    // 1) MultipleSpawnNPC(npc_name, number_of_spawns)
    // 2) MultipleSpawnNPC(npc_name, number_of_spawns, delay_between_spawns)
    // 3) MultipleSpawnNPC(npc_name, number_of_spawns, start_point, end_point)
    // 4) MultipleSpawnNPC(npc_name, number_of_spawns, delay_between_spawns, npcs_per_spawn)
    // 5) MultipleSpawnNPC(npc_name, number_of_spawns, start_point, end_point, delay_between_spawns)
    //
    // In (1), (2) and (3) entry and exit points will be randomly declared.
    // In (1) and (3) all NPCs will spawn at once.
 
    MultipleSpawnNPC: function(npc, number) {
             
        if (arguments.length == 3) {
            this._setIntervalX( function(){ Gameplay.SingleSpawnNPC(npc); }, arguments[2], number);
        }

        else if (arguments.length == 5)  {                
            this._setIntervalX( function(){ Gameplay.SingleSpawnNPC(npc, arguments[2], arguments[3]); }, arguments[4], number);
        }

        else if (arguments.length == 2) {
            for (var i=0; i < number; i++) {
                this.SingleSpawnNPC(npc);
            }
        }

        else if (arguments.length == 4) {

            if (!isNaN(arguments[3])) {
                for (var i=0; i < arguments[3]; i++) {
                    this._setIntervalX( function(){ Gameplay.SingleSpawnNPC(npc); }, arguments[2], number);
                }
            }
            else { 
                for (var i=0; i < number; i++) {
                    this.SingleSpawnNPC(npc, arguments[2], arguments[3]);
                }
            }
        }
        
    },

    init: function() {

        if (Player0.playing) {
            Player0.turret = GameEngine.spawn(new factory['Turret']());
        }

        // Draft. Just to make sure it's working properly.
        // 100 spawns, 2 seconds delay, 2 NPCs per spawn, random direction.
        this.MultipleSpawnNPC("SimpleShip", 100, 2000, 2);

	}
}
