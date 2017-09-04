import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import './src/global';
import Login from './src/components/Login/Login';
import SongList from './src/components/SongList/SongList';

const Hitham = StackNavigator({
  Login : { screen : Login},
  SongList : { screen : SongList},
});
AppRegistry.registerComponent('Hitham', () => Hitham);