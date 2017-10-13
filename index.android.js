import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import './src/global';
import './src/Mapping';
import LoginScreen from './src/screens/LoginScreen';
import SongListScreen from './src/screens//SongListScreen';
import PlayListScreen from './src/screens/PlayListScreen';
const Hitham = StackNavigator({
  Login : { screen : LoginScreen},
  SongList : { screen : SongListScreen},
  PlayList : {screen : PlayListScreen},
});
AppRegistry.registerComponent('Hitham', () => Hitham);