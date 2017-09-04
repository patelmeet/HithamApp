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
        navigate('Demo',{ username : u,password : p});
    };

    render() {
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.logocontainer}>
            <Image style={styles.logo} source={require('../../images/hithamlogo.png')} />
            </View>
            <View style={styles.loginformcontainer}>
                <LoginPage doooLogin={this.doLogin}/>
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
