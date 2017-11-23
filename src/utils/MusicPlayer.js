import Sound from 'react-native-sound';
import Logger from '../utils/Logger';
export default class MusicPlayer{
    static player=null;
    static isPlaying=false;
    static song=DEFAULT_SONG;
    static paused = false;
    static stateHandler = null;
    static currentTime = 0;
    static error_fn = error => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + MusicPlayer.player.getDuration() 
          + 'number of channels: ' + MusicPlayer.player.getNumberOfChannels());
        MusicPlayer.isPlaying = true; 
        //MusicPlayer.stateHandler(MusicPlayer.song);
        Logger.record(MusicPlayer.song[SONG_ID],"PLAY",0);
        MusicPlayer.player.play( (success) => {
            if(success){
                Logger.record(MusicPlayer.song[SONG_ID],"END",MusicPlayer.getDuration());
                MusicPlayer.isPlaying=false;
                //MusicPlayer.stateHandler(MusicPlayer.song);
            }
        })  
    };

    static releaseHandler(){
        //MusicPlayer.stateHandler = null;
    }

    static getCurrentTime(){
        if(MusicPlayer.player!=null){
            MusicPlayer.player.getCurrentTime( (seconds) => {
                return seconds;
            });
        }
        return 0;
    }

    static getRecordingID(){
        return MusicPlayer.song[RECORDING_ID];
    }

    static getDuration(){
        if(MusicPlayer.player!=null)
            return MusicPlayer.player.getDuration();
        else
            return 0;
    }

    static toggle(){
        try{
            MusicPlayer.paused = false;
            if(MusicPlayer.player != null){
                if(MusicPlayer.isPlaying == true){
                    MusicPlayer.paused = true;
                    MusicPlayer.player.getCurrentTime( (seconds) => {
                        Logger.record(MusicPlayer.song[SONG_ID],"PAUSED",seconds);
                    });
                    MusicPlayer.player.pause();
                    MusicPlayer.isPlaying=false;
                }
                else if(MusicPlayer.player.isLoaded()== true ){
                    MusicPlayer.isPlaying=true;
                    MusicPlayer.player.getCurrentTime( (seconds) => {
                        Logger.record(MusicPlayer.song[SONG_ID],"CONTINUE",seconds);
                    }); 
                    MusicPlayer.player.play( (success) => {
                        if(success){ 
                            Logger.record(MusicPlayer.song[SONG_ID],"END",MusicPlayer.player.getDuration());
                            MusicPlayer.isplaying=false;
                        }
                    });
                }
            }
        }catch(error){
            console.log("toggle error: " + error);
        }
    }

    static stop(){
        MusicPlayer.player.pause();
        Logger.record(MusicPlayer.song[SONG_ID],"STOP",MusicPlayer.getCurrentTime());
        MusicPlayer.player.stop();
        MusicPlayer.player.release();
        MusicPlayer.song=DEFAULT_SONG;
//        if(MusicPlayer.stateHandler != null)
//            MusicPlayer.stateHandler(MusicPlayer.song);
//        MusicPlayer.stateHandler=null;
    }

    static playNew(song){
        if(MusicPlayer.isPlaying){
            MusicPlayer.player.stop();
            MusicPlayer.player.release();
        }
//        MusicPlayer.stateHandler = stateHandler;
        MusicPlayer.song = song;
        MusicPlayer.paused = false;
//        console.log('playing new song: '+JSON.stringify(song));
        MusicPlayer.player = new Sound(song[SONG_DOWNLOAD_PATH],Sound.MAIN_BUNDLE,MusicPlayer.error_fn);
    }
} 