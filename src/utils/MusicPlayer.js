import Sound from 'react-native-sound'

export default class MusicPlayer{
    static player=null;
    static isPlaying=false;
    static song=DEFAULT_SONG;
    static stateHandler = null;

    static error_fn = error => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + MusicPlayer.player.getDuration() 
          + 'number of channels: ' + MusicPlayer.player.getNumberOfChannels());
        MusicPlayer.isPlaying = true; 
        MusicPlayer.stateHandler(MusicPlayer.song);
        MusicPlayer.player.play( (success) => {
            if(success){
                MusicPlayer.isPlaying=false;
                MusicPlayer.stateHandler(MusicPlayer.song);
            }
        })  
    };

    static releaseHandler(){
        MusicPlayer.stateHandler = null;
    }

    static getCurrentTime(){
        MusicPlayer.player.getCurrentTime((seconds) => {return seconds}).catch((error)=>{return 0});
    }

    static getDuration(){
        if(MusicPlayer.player!==null)
            return MusicPlayer.player.getDuration();
        else
            return 1;
    }

    static toggle(){
        if(MusicPlayer.player != null){
            if(MusicPlayer.isPlaying == true){
                MusicPlayer.player.pause();
                MusicPlayer.isPlaying=false;
            }
            else if(MusicPlayer.player.isLoaded()== true ){
                MusicPlayer.isPlaying=true;
                MusicPlayer.player.play( (success) => { 
                    if(success){ 
                        MusicPlayer.isplaying=false;
                    }
                });
            }
        }
    }

    static stop(){
        MusicPlayer.player.stop();
        MusicPlayer.player.release();
        MusicPlayer.song=DEFAULT_SONG;
        if(MusicPlayer.stateHandler != null)
            MusicPlayer.stateHandler(MusicPlayer.song);
        MusicPlayer.stateHandler=null;
    }

    static playNew(song,stateHandler){
        if(MusicPlayer.isPlaying){
            MusicPlayer.player.stop();
            MusicPlayer.player.release();
        }
        MusicPlayer.stateHandler = stateHandler;
        MusicPlayer.song = song;
        MusicPlayer.player = new Sound(song.downloadLoc,Sound.MAIN_BUNDLE,MusicPlayer.error_fn);
    }
} 