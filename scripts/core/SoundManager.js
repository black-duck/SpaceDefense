soundManager = {
	//General variables for the sound of the app
	effectsVolume: 1,
	
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
	
	/* Optional lodader function inside soundmanager
	 *
	 * Some Code Here
	 */
	 
	//Sound object for management the sounds effects
	sounds: {
	
		sArray: new Array(),
		//Add to sArray the new sound
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
		//Set the volume of all the sounds effects
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
		//Mute all sound effects
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
		//Unmute all sound effects
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
	//Play the sound effect
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
	//Music object for the music managment
	music: {
		//This array will hold the links
		mArray: new Array(),
		//The main music audio player
		maudio: new Audio(),
		
		counter: 0,
		//Add music track
		add: function(src){
			this.mArray.push(src);			
		},
		
		startmusic: function(){
			this.maudio = Loader.load(mArray[this.counter] + this.audioType);
			this.maudio.autoplay = false;
			this.maudio.muted = false;
			this.maudio.play();
			/* //Code in order to change the track of music. Not implemented yet.
			 this.maudio.addEventListener('onended', function(){ //Change the song
				
			 });
			 */
			this.maudio.loop = true; //Replay the same song. Draft solution.
		},
		//Set the volume of the music
		volumeSet: function(set){
			this.maudio.volume = set;		
		},
		//Mute the music
		musicMute: function(){
			this.maudio.muted = true;		
		},
		//Unmute the music
		musicUnmute: function(){
			this.maudio.muted = false;		
		}
	},
	//Play the background music
	playMusic: function(array){
		for(var i = 0; i < array.length; i++){
			this.music.add(array[i] + this.audioType);
		}
		this.music.startmusic();	
	},
	//Volume up the effects
	volumeUpEffects: function(){
		if(this.effectsVolume + offsetVolume <= 1)
			this.effectsVolume += offsetVolume;
		else
			this.effectsVolume = 1;
		this.sounds.volumeSet(this.effectsVolume);	
	},
	//Volume down the effects
	volumeDownEffects: function(){
		if(this.effectsVolume - offsetVolume >=0)
			this.effectsVolume += offsetVolume;
		else
			this.effectsVolume = 0;
		this.sounds.volumeSet(this.effectsVolume);	
	},
	//Volume up the music
	volumeUpMusic: function(){
		if(this.musicVolume + musicVolume <= 1)
			this.musicVolume += musicVolume;
		else
			this.musicVolume = 1;
		this.sounds.volumeSet(this.musicVolume);	
	},
	//Volume down the music
	volumeDownMusic: function(){
		if(this.musicVolume - musicVolume >=0)
			this.musicVolume += musicVolume;
		else
			this.musicVolume = 0;
		this.sounds.volumeSet(this.musicVolume);	
	},
	//Mute the sound
	muteAll: function(){
		this.sounds.soundMute();
		this.music.musicMute();
	},
	//Unmute the sound
	numuteAll: function(){
		this.sounds.soundUnmute();
		this.music.musicUnmute();
	},

	
	tempVar: 0
};