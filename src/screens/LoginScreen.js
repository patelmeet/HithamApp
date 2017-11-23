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

    componentWillMount(){
        User.init();
    }

    componentDidMount(){
        //if(User.username != null)
        //    doLogin(User.username,User.password);

    }
    
    async fetchUpdatePlayList(response){
        try{
            let playlists = JSON.stringify(response[RESPONSE_PLAYLISTS]);
            console.log("storing playlists: "+playlists);
            await AsyncStorage.setItem(RESPONSE_PLAYLISTS,playlists);    
            await DataStore.updateSongs(response[RESPONSE_SONGS]);
            await User.setStudentPK(response[STUDENT_PK]);
            await User.setProfile(response[RESPONSE_PROFILE]);
            return response[RESPONSE_PLAYLISTS];
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
            if(u!=User.getUsername())
                AsyncStorage.clear();
            // set p or encrypted_p ?????
            User.setPassword(p);
            Toast.show('Syncing playlists...', Toast.LONG);
        }
        let playlists = await this.fetchUpdatePlayList(response);
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
