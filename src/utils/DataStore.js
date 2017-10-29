import { AsyncStorage } from 'react-native';
import FileStore from '../utils/FileStore';
export default class DataStore {
    
    static std_pk = 5;

    static setStudentPK(value){
        DataStore.std_pk = value;
        AsyncStorage.setItem(STUDENT_PK,value);
        console.log("setting student pk: "+value);
    }

    static getStudentPK(){
        return DataStore.std_pk;
    }

    static updatePlayLists(list){
        for(playlist in list){
            
        }
    }

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

    static getProfile(){
        
    }

    static setProfile(func){
        AsyncStorage.getItem(RESPONSE_PROFILE,(err,item)=>{
            if(item!=null)
                func(item);
            else
                func(DEFAULT_PROFILE);
        });
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
                    await console.log('song already exists: '+songsList[i][SONG_ID]);
            }
            await console.log('out of for loop ');
        }catch(error){
            await console.log('download Image Error: '+error);
        }    
    }
}

