import Sound from 'react-native-sound'

export default class MusicPlayer{
    static player=null;
    static isPlaying=false;

    static error_fn = error => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + MusicPlayer.player.getDuration() 
          + 'number of channels: ' + MusicPlayer.player.getNumberOfChannels());
        MusicPlayer.isPlaying = true; 
        MusicPlayer.player.play( (success) => {
            if(success){
                MusicPlayer.isPlaying=false;
            }
        })  
    };

    static toggle(){
        if(MusicPlayer.player != null){
            if(MusicPlayer.isPlaying == true){
                MusicPlayer.player.pause();
                MusicPlayer.isPlaying=false;
            }
            else if(MusicPlayer.player.isLoaded()== true ){
                MusicPlayer.isPlaying=true;
                MusicPlayer.player.play( (success) => { if(success){ MusicPlayer.isplaying=false }} );
            }
        }
    }

    static stop(){
        MusicPlayer.player.stop();
        MusicPlayer.player.release();
    }

    static playNew(location){
        MusicPlayer.player = new Sound(location,Sound.MAIN_BUNDLE,MusicPlayer.error_fn);
    }
} 