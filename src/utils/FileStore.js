import RNFetchBlob from 'react-native-fetch-blob';

export default class FileStore {

    static async downloadSong(song){
        try{
        let res = await RNFetchBlob.config({fileCache : true}).fetch('GET',song.songlist_url,{});
        await console.log('----song download successful');
        song['downloaded'] = true;
        song['downloadLoc']=res.path();
        return song;
        }catch(error){
            console.log("error"+error);
            return song;
        }
    }    
}