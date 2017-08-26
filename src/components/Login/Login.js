import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView
} from 'react-native';

import LoginForm from './LoginForm';

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <View style={styles.logocontainer}>
              <Image style={styles.logo} source={require('../../images/hithamlogo.png')} />
          </View>
          <View style={styles.loginformcontainer}>
              <LoginForm />
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
