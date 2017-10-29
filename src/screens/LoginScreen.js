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

import FileStore from '../utils/FileStore';
import DataStore from '../utils/DataStore';
import Rest from '../utils/Rest';
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
    
    async fetchUpdatePlayList(response){
        try{
            if(response != null){                
                await AsyncStorage.setItem(RESPONSE_PROFILE,response[RESPONSE_PROFILE]);
                await AsyncStorage.setItem(RESPONSE_PLAYLISTS,JSON.stringify(response[RESPONSE_PLAYLISTS]));    
                await DataStore.updateSongs(response[RESPONSE_SONGS]);
                await DataStore.setStudentPK(response[STUDENT_PK]);
                return response[RESPONSE_PLAYLISTS];
            }
            else
                return DataStore.getPlaylists();
        }catch(error){
            console.log("No Internet: "+error);
            return DataStore.getPlaylists();
        }
    };

    async doLogin(u,p){
        try{
        let encrypted_p = encryptme(p);    
        var body = JSON.stringify({student_id: u,student_password: encrypted_p});
        let response = await Rest.post(serviceURL,body);
//        await console.log('response obtained -->>>  '+JSON.stringify(response));
        if(response != null && response[RESPONSE_STATUS]==false){
            console.log("Incorrect Login Credentials");
            return;
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
