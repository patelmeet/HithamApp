import Sound from 'react-native-sound';
import Logger from '../utils/Logger';
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
                Logger.record(MusicPlayer.song[SONG_ID],"END",0);
                MusicPlayer.isPlaying=false;
                MusicPlayer.stateHandler(MusicPlayer.song);
            }
        })  
    };

    static releaseHandler(){
        MusicPlayer.stateHandler = null;
    }

    static getCurrentTime(){
        if(MusicPlayer.player!==null){
            MusicPlayer.player.getCurrentTime((seconds) => {return seconds}).catch((error)=>{return 0});
        }
        else
            return 0;
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
                Logger.record(MusicPlayer.song[SONG_ID],"PAUSED",0);
                MusicPlayer.player.pause();
                MusicPlayer.isPlaying=false;
            }
            else if(MusicPlayer.player.isLoaded()== true ){
                MusicPlayer.isPlaying=true;
                Logger.record(MusicPlayer.song[SONG_ID],"CONTINUE",0); 
                MusicPlayer.player.play( (success) => {
                    if(success){ 
                        Logger.record(MusicPlayer.song[SONG_ID],"END",0);
                        MusicPlayer.isplaying=false;
                    }
                });
            }
        }
    }

    static stop(){
        Logger.record(MusicPlayer.song[SONG_ID],"STOP",0);
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
        console.log('playing new song: '+JSON.stringify(song));
        MusicPlayer.player = new Sound(song[SONG_DOWNLOAD_PATH],Sound.MAIN_BUNDLE,MusicPlayer.error_fn);
        Logger.record(MusicPlayer.song[SONG_ID],"PLAY",0);
    }
} 