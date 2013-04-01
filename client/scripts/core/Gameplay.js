// Class that describes a spawn.
// Every new spawn is buildind the 'instant' method on initialization.
// The 'instant' method will be executed on the specified times during the
// 'update' method. To set these times, use the 'execute' method.
Spawn = Class.extend({

    waittimecount: 1,
    timetowait: 0,
    timecount: 1,
    delay: 0,
    spawncount: 0,
    _active: true,
	
    init: function(npc, number) {
    
        if (arguments.length == 2) {
            this.npcname = npc;
            this.npcperspawn = number;
            this.instant = function() {
                for (var i=0; i < this.npcperspawn; i++) {
                    this.SingleSpawnNPC(this.npcname);
                }
            };
        }

        else if (arguments.length == 4) {
            this.npcname = npc;
            this.npcperspawn = number;
            this.entry = arguments[2];
            this.exit = arguments[3];
            this.instant = function() {
                for (var i=0; i < this.npcperspawn; i++) {
                    this.SingleSpawnNPC(this.npcname, this.entry, this.exit);
                }
            }
        }

    },

    // This will repeat the spawn each <var> seconds for <var> times, starting after <var> seconds.
    execute: function() {

        if (arguments.length == 0) {
            this.instant();
        }

        if (arguments.length == 1) {
            this.timetowait = arguments[0];
            this.numberofspawns = 1;
        }
        else {        
            this.delay = arguments[1]; 
            this.numberofspawns = arguments[0];

            if (arguments.length == 3) { 
                this.timetowait = arguments[2]; 
            }
        }
        Gameplay.activeSpawns.push(this);
    },

    // Returns a random integer. TODO: This should be moved somewhere else.
    _getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // The actual update method for the 'repetive' spawns.
    // The 'repetive' spawn checks if it is time to act a new spawn.
    update: function() {

        if (this.waittimecount > this.timetowait) {

            if (this.timecount > this.delay) {
                this.instant();
                this.timecount = 0;

                if (++this.spawncount === this.numberofspawns) {
                    this._active = false;
                }
            }
            this.timecount += framesInterval;
        }
        this.waittimecount += framesInterval;

    },

    // A very single spawn of one NPC. 
    // If entry and exit points are not defined, they will be randomly declared.
    SingleSpawnNPC: function(npc) {

        if (arguments.length == 1) { 
            rand = this._getRandomInt(1,3); 
            entry = Map.entries[rand];
            rand = this._getRandomInt(1,2); 
            exit = Map.exits[rand];
        }
        else if (arguments.length == 3) {
            entry = arguments[1];
            exit = arguments[2];
        }

        GameEngine.spawn(npc,entry.x, entry.y, exit.x - entry.x, exit.y - entry.y);

    }

});


// The Gameplay Class that holds and updates a list of active spawns.
Gameplay = {     

    activeSpawns: [],

    update: function () {

        for (var i = this.activeSpawns.length; i-- ; i) {
		
			if (this.activeSpawns[i]._active === true) {
				this.activeSpawns[i].update();
		    }
        }
    },

    init: function() {

        if (Player0.playing) {
            Player0.turret = GameEngine.spawn('Turret');
        }

        spawn1 = new Spawn("SimpleShip", 1);
        spawn2 = new Spawn("Asteroid", 1);
        spawn1.execute(10, 2000, 1000);
        spawn2.execute(1, 2000, 10000); 

	}
}
