import { AsyncStorage } from 'react-native';
import FileStore from '../utils/FileStore';
export default class DataStore {
    static updatePlayLists(list){
        for(playlist in list){
            
        }
    }

    static containsKey(key){
        AsyncStorage.getItem(''+key,(err,item)=>{
            if(item)
                return true;
            return false;
        });
        return false;
    }

    static async updateSongs(songsList){
        try{
            console.log(songsList.length);
            for(let i=0 ; i<songsList.length ; i++){
                console.log('i is '+i);
                if(!DataStore.containsKey(songsList[i].songlist_id)){
                    await console.log('adding song : '+songsList[i].songlist_id);
                    FileStore.updateSongInfo(songsList[i]);
                }
            }
            console.log('out of for loop ');
        }catch(error){
            console.log('download Image Error: '+error);
        }    
    }
}

