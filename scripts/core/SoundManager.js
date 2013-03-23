soundManager = {
	effectsVolume: 1,
	musicVolume: 1,
	offsetVolume: 0.1;
	globalMute: false,
	audioType: 'ogg';
	
	init: function(){
		var audio =  new Audio();
		if (audio.canPlayType('audio/ogg; codecs="vorbis"'))
			this.audioType = 'ogg';
		else
			this.audioType = 'mp3';	
	},
	
	/*Call the Loader
	
		HERE
	
	*/
	
	//This array will hold all the efects for the game
	sounds: {
		sArray: new Array(),
		add: function(objAudio){
			try{
				//If exists any element in array, find the proper one
				for(var i = 0; i < this.sArray; i++){
					if(this.sArray[i].ended === true)
						this.sArray[i] = objAudio;
						this.sArray[i].play();
						return;
				}
				//If not exists any element in array, or it cannot fit anywhere
				this.sArray[this.sArray.length] = objAudio;
				this.sArray[i].play();
				return;
			}
			catch(e){
				console.log('Error in sArray');
			}
		},
		volumeSet: function(set){
			try{
				for(var i = 0; i < this.sArray; i++){
					if(this.sArray[i].ended === false)
						this.sArray[i].volume = set;
				}
			}
			catch(e){
				console.log('Error in sArray Volume Up');
			}
		},
		soundMute: function(){
			try{
				for(var i = 0; i < this.sArray; i++){
					if(this.sArray[i].ended === false)
						this.sArray[i].muted = true;
				}
			}
			catch(e){
				console.log('Error in sArray Volume Up');
			}
		},
		soundUnmute: function(){
			try{
				for(var i = 0; i < this.sArray; i++){
					if(this.sArray[i].ended === false)
						this.sArray[i].muted = false;
				}
			}
			catch(e){
				console.log('Error in sArray Volume Up');
			}
		}
	},
	
	playSound: function(src){
		try{
			var audio = Loader.load(src + this.audioType);
			audio.autoplay = false;
			audio.muted = this.globalMute;
			audio.volume = this.effectsVolume;
			this.sounds.add(audio);
		}
		catch(e){
			console.log('Error In Sound Play');
		}
	},
	
	music: {
		mArray: new Array(),
		maudio: new Audio(),
		counter: 0,
		
		add: function(src){
			this.mArray.push(src);			
		},
		
		startmusic: function(){
			this.maudio = Loader.load(mArray[this.counter] + this.audioType);
			this.maudio.loop = true; //Debug Only
			this.maudio.autoplay = false;
			this.maudio.muted = false;
			this.maudio.play();
			/*this.maudio.addEventListener('onended', function(){ //Change the song
				console.log("Ended");//DebugOnly
			});*/
		},
		volumeSet: function(set){
			this.maudio.volume = set;		
		},
		musicMute: function(){
			this.maudio.muted = true;		
		},
		musicUnmute: function(){
			this.maudio.muted = false;		
		}
	},
	
	playMusic: function(array){
		for(var i = 0; i < array.length; i++){
			this.music.add(array[i] + this.audioType);
		}
		this.music.startmusic();	
	},
	
	volumeUpEffects: function(){
		if(this.effectsVolume + offsetVolume <= 1)
			this.effectsVolume += offsetVolume;
		else
			this.effectsVolume = 1;
		this.sounds.volumeSet(this.effectsVolume);	
	},
	
	volumeDownEffects: function(){
		if(this.effectsVolume - offsetVolume >=0)
			this.effectsVolume += offsetVolume;
		else
			this.effectsVolume = 0;
		this.sounds.volumeSet(this.effectsVolume);	
	},
	
	volumeUpMusic: function(){
		if(this.musicVolume + musicVolume <= 1)
			this.musicVolume += musicVolume;
		else
			this.musicVolume = 1;
		this.sounds.volumeSet(this.musicVolume);	
	},
	
	volumeDownMusic: function(){
		if(this.musicVolume - musicVolume >=0)
			this.musicVolume += musicVolume;
		else
			this.musicVolume = 0;
		this.sounds.volumeSet(this.musicVolume);	
	},
	
	muteAll(){
		this.sounds.soundMute();
		this.music.musicMute();
	},
	
	numuteAll(){
		this.sounds.soundUnmute();
		this.music.musicUnmute();
	},
	
	
	
	
	
	
	tempVar: 0;
};