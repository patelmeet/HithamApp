import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import './LoginForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.logocontainer}>
              <Image style={styles.logo} source={require('../../images/hithamlogo.png')} />
          </View>
          <View style={styles.loginformcontainer}>
              <LoginForm />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  logocontainer: {},
  logo: {},
  loginformcontainer: {}
});

AppRegistry.registerComponent('Login', () => Login);
