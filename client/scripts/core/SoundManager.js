SoundManager = {
	//General variables
	offsetVolume: 0.1,
	
	globalMute: false,
	
	audioType: 'ogg',
	
	//Sound Variables
	effectsVolume: 0.15,
	
	sounds: [],
	
	soundsLoaded: [],
	
	context: null,
	
	volumeNode: null,
	
	soundBuffers: {},
	
	//Init Function	
	init: function(array){
	
		//Define the type of audio supported.
		var audio =  new Audio();
		
		if (audio.canPlayType('audio/ogg; codecs="vorbis"'))
			this.audioType = 'ogg';
		else
			this.audioType = 'mp3';
		
		//Create AudioContext
		if (typeof AudioContext !== "undefined")
			this.context = new AudioContext();
		else if (typeof webkitAudioContext !== "undefined")
			this.context = new webkitAudioContext();
		else
			console.log('AudioContext not supported. :(');		
		
		//Create a volumeNode of AudioContext
		this.volumeNode = this.context.createGainNode();
		
		this.volumeNode.gain.value = this.effectsVolume;
		
		this.volumeNode.connect(this.context.destination);
		
		//Preload sounds - DRAFT
		for(var i = 0; i < array.length; i++)
			this._loadSound(array[i]);
	},
	
	//Play sound, if loaded - DRAFT
	playSound: function(src){
	
		var res = this._searchSound(src);
		
		if(res == -1){
			console.log('Not Loaded Yet');//DRAFT
			return;
		}
		
		var source = this.context.createBufferSource();
		source.buffer = this.soundBuffers[this.sounds[res]];
		source.loop = false;
		source.connect(this.volumeNode);
		source.noteOn(0);
	},
	
	//Return the index of src in sounds if loaded
	_searchSound: function(src){
		return this.sounds.indexOf(src);	
	},
	
	
	//Load the sounds - DRAFT
	_loadSound: function(src){
		var request = new XMLHttpRequest();
		
		request.open('GET', src + '.' + this.audioType, true);
		request.responseType = 'arraybuffer';
		request.addEventListener('load',function(event){
		
			var request = event.target;
			var buffer = SoundManager.context.createBuffer(request.response, false);
			SoundManager.soundBuffers[src] = buffer;
			SoundManager.sounds.push(src);
			SoundManager.soundsLoaded.push(true);
			
		}, false);
		
		request.send();
	},
	
	//Music Variables
	musicArray: new Array(),
		
	musicVolume: 1,
		
	maudio: new Audio(),
	
	counter: 0,
	
	//Load the playlist
	loadMusic: function(array){
		this.musicArray = array;
		this.maudio = Loader.load(this.musicArray[this.counter] + '.' + this.audioType);
		this.maudio.autoplay = false;
		this.maudio.muted = this.globalMute;
		this.maudio.volume = this.musicVolume;
		this.maudio.addEventListener("ended",function(){
			SoundManager.nextTrack();
		});
	},
	
	//Next track please!
	nextTrack: function(){
		this.counter = (this.counter + 1) % this.musicArray.length;
		this.maudio = Loader.load(this.musicArray[this.counter] + '.' + this.audioType);
		this.maudio.autoplay = false;
		this.maudio.muted = this.globalMute;
		this.maudio.volume = this.musicVolume;
		this.maudio.addEventListener("ended",function(){
			SoundManager.nextTrack();
		});
		this.playMusic()
	},
	
	//Play the music
	playMusic: function(){
		this.maudio.play();	
	},
	
	//Volume up the effects
	volumeUpEffects: function(){
		if(this.effectsVolume + this.offsetVolume <= 1)
			this.volumeNode.gain.value += this.offsetVolume ;
		else
			this.volumeNode.gain.value = 1;	
	},
	
	//Volume down the effects
	volumeDownEffects: function(){
		if(this.effectsVolume - this.offsetVolume >=0)
			this.volumeNode.gain.value -= this.offsetVolume;
		else
			this.volumeNode.gain.value = 0;
	},
	
	//Volume up the music
	volumeUpMusic: function(){
		if(this.musicVolume + this.offsetVolume <= 1)
			this.musicVolume += this.offsetVolume;
		else
			this.musicVolume = 1;
		this.maudio.volume = this.musicVolume;	
	},
	
	//Volume down the music
	volumeDownMusic: function(){
		if(this.musicVolume - this.offsetVolume >=0)
			this.musicVolume -= this.offsetVolume;
		else
			this.musicVolume = 0;
		this.maudio.volume = this.musicVolume;	
	},
	
	//Mute the sound
	muteAll: function(){
		this.volumeNode.gain.value = 0;
		this.maudio.muted = true;
	},
	
	//Unmute the sound
	umuteAll: function(){
		this.volumeNode.gain.value = this.effectsVolume;
		this.maudio.muted = false;
	},
	
	//Optional functions
	
	//Global volume up
	globalVolumeUp: function(){
		this.volumeUpMusic();
		this.volumeUpEffects();
	},
	
	//Global volume down
	globalVolumeUp: function(){
		this.volumeUpMusic();
		this.volumeUpEffects();
	},
	
	//Effects volume
	volumeEffects: function(){
		return Math.floor(this.effectsVolume * 100);
	},
	
	//Music volume
	volumeMusic: function(){
		return Math.floor(this.volumeMusic * 100);
	},
	
	//Global volume
	globalVolume: function(){
		var diff = Math.abs(this.effectsVolume - this.volumeMusic);
		diff = Math.floor(diff * 100);	
		
		if(diff == 0) 
			return Math.floor(this.volumeMusic * 100);
		else
			return  Math.floor((this.effectsVolume + this.volumeMusic) * 100 / 2);
	},
	
	//Supported audio type
	soundType: function(){
		return this.audioType;
	}	
}
//Draft
SoundManager.init(['sounds/LaserBeam0', 'sounds/LaserBeam1', 'sounds/Explosion0']);
