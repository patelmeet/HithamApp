import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import './Login/Login';

export default class MainComponent extends Component {
  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('MainComponent', () => MainComponent);
