import { AsyncStorage } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob';

export default class FileStore {

    static async downloadSongImages(songs){
        try{
            for(let i=0 ; i<songs.length ; i++){
                const c_song = await AsyncStorage.getItem(''+songs[i].songlist_id);
                if( c_song == null){
                    console.log('adding song : '+songs[i].songlist_id);
                    await RNFetchBlob.config({fileCache : true, appendExt : 'jpg'})
                    .fetch('GET',songs[i]['songlist_pic_url'],{})
                    .then((res) => {
                        console.log('----download successful');
                        var song = songs[i];
                        song['downloaded'] = false;
                        song['downloadLoc'] = '';
                        song['songlist_pic_downloadLoc']=res.path();
                        AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(song));
                    }).catch((err)=>{
                        console.log(err);
                        var song = songs[i];
                        song['downloaded'] = false;
                        song['downloadLoc'] = '';
                        song['songlist_pic_downloadLoc']=NO_IMAGE_PATH;
                        AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(song));
                    });
                }
            }
        }catch(error){
            console.log('download Image Error: '+error);
        }    
    }

    static async downloadSong(song){
        try{
        let res = await RNFetchBlob.config({fileCache : true}).fetch('GET',song.songlist_url,{});
        await console.log('----song download successful: '+song.songlist_id);
        song['downloaded'] = true;
        song['downloadLoc']=res.path();
        return song;
        }catch(error){
            console.log("this is an error:::::::::::"+error);
            return song;
        }
    }    
}