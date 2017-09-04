import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
<<<<<<< HEAD
=======

>>>>>>> 89a35318c2ad8c1de7cd1302a50f6ad2118f8599
import {StackNavigator} from 'react-navigation';
import './src/global';
import Login from './src/components/Login/Login';
import SongList from './src/components/SongList/SongList';
<<<<<<< HEAD
import SongDemo from './src/components/SongList/SongDemo';
const Hitham = StackNavigator({
  
  Login : { screen : Login},
  Song : { screen : SongList},
  Demo:{screen: SongDemo}
=======

const Hitham = StackNavigator({
  Login : { screen : Login},
  SongList : { screen : SongList},
>>>>>>> 89a35318c2ad8c1de7cd1302a50f6ad2118f8599
});
AppRegistry.registerComponent('Hitham', () => Hitham);