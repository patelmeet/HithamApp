import { AsyncStorage } from 'react-native';

export default class User {

    static std_pk = 5;
    static profile = DEFAULT_PROFILE;
    static playlists = [];
    static username = null;
    static password = null;

    static init(){
        console.log("Initializing User Data...");
        AsyncStorage.getItem(RESPONSE_PLAYLISTS,(err,item)=>{
            if(item!=null){
                User.playlists = JSON.parse(item);
                console.log("got playlists: "+item);
            }
        });
        AsyncStorage.getItem(RESPONSE_PROFILE,(err,item)=>{
            if(item!=null){
                User.profile = item;
                console.log("got profile: "+item);
            }
        });
        AsyncStorage.getItem(STUDENT_PK,(err,item)=>{
            if(item!=null)
                User.std_pk = item;
        });
        AsyncStorage.getItem('username',(err,item)=>{
            if(item!=null){
                User.username = item;
                console.log("got username: "+item);
            }
        });
        AsyncStorage.getItem('password',(err,item)=>{
            if(item!=null)
                User.password = item;
        });

    }

    static getStudentPK(){
        return User.std_pk;
    }

    static setStudentPK(value){
        User.std_pk = value;
        AsyncStorage.setItem(STUDENT_PK,value);
    }

    static getProfile(){
        return User.profile;
    }

    static setProfile(value){
        AsyncStorage.setItem(RESPONSE_PROFILE,value);
        User.profile = value;
    }

    static getPlaylists(){
        return User.playlists;
    }

    static setUsername(value){
        AsyncStorage.setItem('username',value);
    }

    static getUsername(){
        return User.username;
    }

    static setPassword(value){
        AsyncStorage.setItem('password',value);
    }
}