import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView
} from 'react-native';

import LoginPage from './LoginPage';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
        };
        this.doLogin = this.doLogin.bind(this);
    };  
    doLogin = (u,p) =>{
        const { navigate } = this.props.navigation;
<<<<<<< HEAD
        navigate('Demo',{ username : u,password : p});
=======
        navigate('SongList',{ username : u,password : p});
>>>>>>> 89a35318c2ad8c1de7cd1302a50f6ad2118f8599
    };

    render() {
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.logocontainer}>
            <Image style={styles.logo} source={require('../../images/hithamlogo.png')} />
            </View>
            <View style={styles.loginformcontainer}>
<<<<<<< HEAD
                <LoginPage doooLogin={this.doLogin}/>
=======
                <LoginPage doLogin={this.doLogin}/>
>>>>>>> 89a35318c2ad8c1de7cd1302a50f6ad2118f8599
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

AppRegistry.registerComponent('Login', () => Login);
