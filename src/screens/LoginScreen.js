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

import RNFetchBlob from 'react-native-fetch-blob';
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

    async updateDB(response){
        var alllist = [];
        for(let i=0 ; i<response.length ; i++){
            await AsyncStorage.getItem(''+response[i].songlist_id , (err,item) => {
                if(item){
                    //Already added
                    console.log('-----------if');
                    alllist.push(JSON.parse(item));
                }
                else{
                    //Add
                    let songid = ''+response[i].songlist_id;
                    console.log('-----------else');
                    var curres = response[i];
                    curres['downloaded'] = false;
                    curres['downloadLoc'] = '';
                    RNFetchBlob.config({fileCache : true, appendExt : 'jpg'})
                    .fetch('GET',curres['songlist_pic_url'],{})
                    .then((res) => {
                        console.log('----download successful');
                        curres['songlist_pic_downloadLoc']=res.path();
                        AsyncStorage.setItem(songid,JSON.stringify(curres), (err) => {
                            if(err){
                                console.log("---error"+err.message);
                            }
                            else{
                                console.log("---Inserted Successfullly + "+ JSON.stringify(curres));
                            }
                        });
                        alllist.push(curres);  
                    })
                }
            });
        }
        return await alllist;
    };
    
    async fetchAPIResponse(url){
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
          } catch(error) {
            console.error(error);
          }
    };
    
    async fetchUpdatePlayList(){
        try{
            flag = await NetInfo.isConnected.fetch();
            if(flag){
                //await console.log(serviceURL+'songs');
                let response = await this.fetchAPIResponse(serviceURL+'userdata');
//                await console.log("response obtained"+JSON.stringify(response['songslist']));
                let alllist = await this.updateDB(response['songslist']);
//                await console.log(alllist);
                return response;
            }
        }catch(error){
            console.log(error);
            return "error_fetchUpdatePlayList";
        }
    };

    async doLogin(u,p){
        try{
        const { navigate } = this.props.navigation;
        await console.log("Doing Login...");
        let resp = await this.fetchUpdatePlayList();
//        await console.log(resp);
        await this.setState({response:resp});
        await navigate('PlayList',{ response : resp['playlists']});
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
