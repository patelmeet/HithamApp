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

    
    async fetchAPIResponse(url,u,p){
        try {
            await console.log('sending u: '+u+' and p: '+p);
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  student_id: u,
                  student_password: p,
                })
              });
            let responseJson = await response.json();
            //await console.log('fetchAPIResponse: '+JSON.stringify(responseJson));
            return responseJson;
          } catch(error) {
            console.error('fetch error: '+error);
        }
    };
    
    async fetchUpdatePlayList(u,p){
        try{
            if(NetInfo.isConnected.fetch()){
                await console.log(serviceURL);
                let response = await this.fetchAPIResponse(serviceURL,u,p);
                await console.log("response obtained"+JSON.stringify(response['songslist']));
                await AsyncStorage.setItem('playlists',JSON.stringify(response['playlists']));    
                await FileStore.downloadSongImages(response['songslist']);
                return response['playlists'];
            }
            else{
                let playlists = await AsyncStorage.getItem("playlists");
                return playlists;
            }
        }catch(error){
            console.log(error);
            await AsyncStorage.getItem("playlists",(err,item)=>{
                if(item)
                    return item;
                else
                    console.log("No Playlist Info Available");
                    return [];
            });
        }
    };

    async doLogin(u,p){
        try{
        const { navigate } = this.props.navigation;
        await console.log("Doing Login...");
        let playlists = await this.fetchUpdatePlayList(u,p);
        await console.log('response obtained -->>>  '+JSON.stringify(playlists));
        await this.setState({response:playlists});
        await navigate('PlayList',{ response : playlists });
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
