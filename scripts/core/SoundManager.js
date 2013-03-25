SoundManager = {
	//General variables
	effectsVolume: 0.15,
	
	musicVolume: 1,
	
	offsetVolume: 0.1,
	
	globalMute: false,
	
	audioType: 'ogg',
	
	//Define the type of audio supported.
	init: function(){
	
		var audio =  new Audio();
		
		if (audio.canPlayType('audio/ogg; codecs="vorbis"'))
			this.audioType = 'ogg';
		else
			this.audioType = 'mp3';
	},
	
	numeberSpaces: 5, //DRAFT  ->> bullets per second * audio duration 
	
	main: new Array(this.numeberSpaces),
	secondary: new Array(this.numeberSpaces),
	c1: 0,
	c2: 0,
	 
	loadGuns: function(src1, src2){
		for(var j = 0; j < this.numeberSpaces; j++){
			this.main[j] = Loader.load(src1 + '.' + this.audioType);
			this.main[j].autoplay = false;
			this.main[j].muted = this.globalMute;
			this.main[j].volume = this.effectsVolume;	
			this.secondary[j] = Loader.load(src1 + '.' + this.audioType);
			this.secondary[j].autoplay = false;
			this.secondary[j].muted = this.globalMute;
			this.secondary[j].volume = this.effectsVolume;
		}
	},
	
	playGun: function(i){
		if( i === 1){
			this.main[this.c1].play();
			this.c1 = (this.c1 + 1) % this.main.length;
		}
		else{
			this.secondary[this.c2].play();
			this.c2 = (this.c2 + 1) % this.secondary.length;
		}
		
	},
	
	//Play the sound effect
	playSound: function(src){
		try{
			var audio = Loader.load(src + '.' + this.audioType);
			audio.autoplay = false;
			audio.muted = this.globalMute;
			audio.volume = this.effectsVolume;
			audio.play();
		}
		catch(e){
			console.log('Error In Sound Play');
		}
	},
	
	musicArray: new Array(),
	
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
		if(this.effectsVolume + offsetVolume <= 1)
			this.effectsVolume += offsetVolume;
		else
			this.effectsVolume = 1;	
	},
	//Volume down the effects
	volumeDownEffects: function(){
		if(this.effectsVolume - offsetVolume >=0)
			this.effectsVolume += offsetVolume;
		else
			this.effectsVolume = 0;
	},
	//Volume up the music
	volumeUpMusic: function(){
		if(this.musicVolume + musicVolume <= 1)
			this.musicVolume += musicVolume;
		else
			this.musicVolume = 1;
		this.maudio.volume = this.musicVolume;	
	},
	//Volume down the music
	volumeDownMusic: function(){
		if(this.musicVolume - musicVolume >=0)
			this.musicVolume += musicVolume;
		else
			this.musicVolume = 0;
		this.maudio.volume = this.musicVolume;	
	},
	//Mute the sound
	muteAll: function(){
		this.globalMute = true;
		this.maudio.muted = true;
	},
	//Unmute the sound
	umuteAll: function(){
		this.globalMute = false;
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

SoundManager.init();
//Dratf Part
SoundManager.loadGuns('sounds/LaserBeam0','sounds/LaserBeam1');