import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import './src/global';
import Login from './src/components/Login/Login';
import SongList from './src/components/SongList/SongList';
import SongDemo from './src/components/SongList/SongDemo';
const Hitham = StackNavigator({
  
  Login : { screen : Login},
  Song : { screen : SongList},
  Demo:{screen: SongDemo}
});
AppRegistry.registerComponent('Hitham', () => Hitham);