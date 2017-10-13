import { AsyncStorage } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob';

export default class FileStore {

    static async updateSongInfo(song){
        song['downloaded'] = false;
        song['downloadLoc'] = '';
        await RNFetchBlob.config({fileCache : true, appendExt : 'jpg'})
        .fetch('GET',song['songlist_pic_url'],{})
        .then((res) => {
            console.log('--pic download successful');
            song['songlist_pic_downloadLoc']=res.path();
            AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(song));
        }).catch((err)=>{
            console.log('fetch song error '+err);
            song['songlist_pic_downloadLoc']=NO_IMAGE_PATH;
            AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(song));
        });
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