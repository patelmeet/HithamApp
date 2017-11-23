import { AsyncStorage } from 'react-native';
import FileStore from '../utils/FileStore';
export default class DataStore {

    static getItem(key){
        var item = (function (){
            return new Promise((resolve, reject) => {
               AsyncStorage.getItem(key).then((value) => {
                 resolve(value);
              }).done();
            });
      
      });
      return item;
    }    

    static async containsKey(key){
        let item = await AsyncStorage.getItem(''+key);
        await console.log(key+' is is '+(item != null));
        return (item !== null);
    }

    static async updatePlaylists(playlists){
        newPlaylists = [];
        try{
            for(let i=0 ; i<playlists.length ; i++){
                let p = await FileStore.updatePlaylistInfo(playlists[i]);
                newPlaylists.push(p);
            }
            return playlists;
        }catch(error){
            await console.log('download Image Error: '+error);
            return playlists;
        }    
    }

    static async updateSongs(songsList){
        try{
            for(let i=0 ; i<songsList.length ; i++){
                let flag = await DataStore.containsKey(songsList[i][SONG_ID]);
                console.log('flag is '+flag);
                if(flag!=true){
                    await console.log('adding song : '+songsList[i][SONG_ID]);
                    await FileStore.updateSongInfo(songsList[i]);
                }
                else
                    await console.log('song already exists: '+songsList[i][SONG_ID]);
            }
            await console.log('out of for loop ');
        }catch(error){
            await console.log('download Image Error: '+error);
        }    
    }
}

