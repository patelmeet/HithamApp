import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './Login/Login';
import SongList from './SongList/SongList';

export default class MainComponent extends Component {
  render() {
    return (
      <SongList />
    );
  }
}

AppRegistry.registerComponent('MainComponent', () => MainComponent);
