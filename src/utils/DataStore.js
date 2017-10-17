import { AsyncStorage } from 'react-native';
import FileStore from '../utils/FileStore';
export default class DataStore {
    
    static updatePlayLists(list){
        for(playlist in list){
            
        }
    }

    static getPlaylists(){
        AsyncStorage.getItem(RESPONSE_PLAYLISTS,(err,item)=>{
            if(item!=null)
                return item;
            else
                console.log("No Playlist Info Available");
                return [];
        });
    }

    static async containsKey(key){
        let item = await AsyncStorage.getItem(''+key);
        await console.log(key+' is is '+(item != null));
        return (item !== null);
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
                    await console.log('song already eeexists: '+songsList[i][SONG_ID]);
            }
            await console.log('out of for loop ');
        }catch(error){
            await console.log('download Image Error: '+error);
        }    
    }
}

