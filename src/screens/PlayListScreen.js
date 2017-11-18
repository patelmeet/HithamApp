'use strict';

import React, { Component } from 'react'
import { 
    View,  
    Button,
    FlatList,
    ScrollView
 } from 'react-native';
import PlayListItem from '../components/PlayListItem';
import MusicPlayer from '../utils/MusicPlayer';
import PlayerComponent from '../components/PlayerComponent';

export default class PlayListScreen extends Component {
    static navigationOptions = {
        title: 'My PlayLists', 
      };   
      
    componentWillUnmount(){
        if(MusicPlayer.player != null)
            MusicPlayer.stop();
    } 

    _keyExtractor = (item,index) => index;
    
    _renderItem = (item,index) => (
          <PlayListItem
            item={item.item}
            index={index}
            onPressItem={this._onPressItem}
          />
    );
        
    _onPressItem = (list) => {
        const { navigate } = this.props.navigation;
        navigate('SongList',{songsList:list});
    };
    
    render() {
        const { params } = this.props.navigation.state; 
        return (
            <View style = {{justifyContent: 'space-between', flex:1,flexDirection :'column'}}>
            <ScrollView>
            <FlatList
                data={params.playlists}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
            </ScrollView>
        </View >
        );
    }
}