import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import './src/global';
import './src/components/MainComponent';

export default class Hitham extends Component {
  render() {
    return (
      <MainComponent />
    );
  }
}

AppRegistry.registerComponent('Hitham', () => Hitham);
