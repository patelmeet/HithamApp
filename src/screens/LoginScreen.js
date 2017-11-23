import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  NetInfo,
  AsyncStorage
} from 'react-native';

import Toast from 'react-native-simple-toast';
import FileStore from '../utils/FileStore';
import DataStore from '../utils/DataStore';
import Rest from '../utils/Rest';
import User from '../utils/User';
import LoginComponent from '../components/LoginComponent';
import { NavigationActions } from 'react-navigation';

export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            response : '',
        };
        this.doLogin = this.doLogin.bind(this);
    };  

    async componentWillMount(){
        await User.init();
        let u = null;
        let p = null;
        await AsyncStorage.getItem('username',(err,item)=>{
            if(item!=null){
                u = item;
            }
        });
        await AsyncStorage.getItem('password',(err,item)=>{
            if(item!=null && u !=null)
                this.doLogin(u,item);
        });
    }   
    

    componentDidMount(){
        
    }
    
    async fetchUpdatePlayList(response){
        try{
            await DataStore.updateSongs(response[RESPONSE_SONGS]);
            let playlists = DataStore.updatePlaylists(response[RESPONSE_PLAYLISTS]);
            await User.setPlaylists(JSON.stringify(playlists));
            await User.setStudentPK(response[STUDENT_PK]);
            await User.setProfile(response[RESPONSE_PROFILE]);
            return playlists;
        }catch(error){
            console.log("No Internet: "+error);
            return User.getPlaylists();
        }
    };

    async doLogin(u,p){
        try{
        let encrypted_p = encryptme(p);    
        var body = JSON.stringify({student_id: u,student_password: encrypted_p});
        let response = await Rest.post(serviceURL,body);
        var playlists = [];
        if(response != null && response[RESPONSE_STATUS]==false){
            Toast.show('Incorrect Login Credentials', Toast.LONG);
            return;
        }
        if(response == null){
            Toast.show('Could not connect to Server', Toast.LONG);
            playlists = User.getPlaylists();
        }
        else{
            if(u!=User.getUsername()){
                console.log("usernames differ "+u+" "+User.getUsername());
                AsyncStorage.clear();
            }
            User.setUsername(u);    
            // set p or encrypted_p ?????
            User.setPassword(p);
            Toast.show('Syncing playlists...', Toast.LONG);
        }
        let playlists = await this.fetchUpdatePlayList(response);

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //       NavigationActions.navigate({ routeName: 'Profile'},)
        //     ]
        //   })

        // this.props.navigation.dispatch(setParamsAction);
        console.log("MOVEEEEEEEEEEEEEEEEEEEEEE");
        const { navigate } = this.props.navigation;
        await navigate('PlayList',{ playlists : playlists });
        }catch(error){
            console.log('Login Error : '+error);
        }  
    };

    render() {
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.logocontainer}>
            <Image style={styles.logo} source={require('../images/hithamlogo.png')} />
            </View>
            <View style={styles.loginformcontainer}>
                <LoginComponent doLogin={this.doLogin}/>
            </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  logocontainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
      width: 200,
      height: 200
  },
  loginformcontainer: {

  }
});
