import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Sound from 'react-native-sound';
import RNFetchBlob from 'react-native-fetch-blob';

var whoosh;

export default class LoginForm extends Component {

  constructor(){
      super();

      this.state = {
          id: "",
          password: "",
          errors: [],
          isDownloaded: false,
          isplaying: false,
          cururl: "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
      }

      whoosh = new Sound(this.state.cururl , Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        } 
        // loaded successfully
        console.log('loaded succesfully');
      });
  }

  async onLoginPressed(){
      console.log('Login Pressed');
    //   if(this.state.isDownloaded == false){
    //   RNFetchBlob
	// 	  .config({
	// 	    // add this option that makes response data to be stored as a file,
	// 	    // this is much more performant.
	// 	    fileCache : true,
	// 	    appendExt : 'mp3'
	// 	  })
	// 	  .fetch('GET', driveDownloadURL+driveFileId, {
	// 	    //some headers ..
	// 	  })
	// 	  .then((res) => {
	// 	    // the temp file path
    //         console.log('The file saved to ', res.path())
    //         this.setState({ isDownloaded: true, cururl: res.path() });
    // 	  })
    //   }
    
    if(this.state.isplaying==true){
        console.log('true:'+this.state.isplaying);
        whoosh.pause();
        this.setState({isplaying: false});
    }
    else{
        console.log(this.state.isplaying);
        this.setState({isplaying: true});
        whoosh.play( (success) => { if(success){ this.setState({isplaying: false}) }} );
    }

    // var filepath1 = "";
    // filepath1 = await myfetch(driveDownloadURL+driveFileId,"mp3");
    // console.log(filepath1);
    


  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput 
            style={styles.input} 
            placeholder='ID' 
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            onChangeText={(val) => this.setState({id: val})}/>

          <TextInput 
            style={styles.input} 
            placeholder='Password' 
            secureTextEntry 
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
            onChangeText={(val) => this.setState({password: val})}/>

          <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={this.onLoginPressed.bind(this)}>
              <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{padding: 20},
  input: {
      height: 40,
//      backgroundColor: 'blue',
      marginBottom: 20,
//      color: '#FFF',
      paddingHorizontal: 10
  },
  buttonContainer: {
//      backgroundColor: 'blue',
      paddingVertical: 10
  },
  buttonText: {
      textAlign: 'center',
//      color: '#FFFFFF',
      fontWeight: '700'
  }
});

AppRegistry.registerComponent('LoginForm', () => LoginForm);
