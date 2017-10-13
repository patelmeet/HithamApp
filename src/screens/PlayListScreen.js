'use strict';

import React, { Component } from 'react'
import { FlatList } from 'react-native';
import PlayListItem from '../components/PlayListItem';
import MusicPlayer from '../utils/MusicPlayer';

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
        console.log('sending to SongList Screen: '+list);
        navigate('SongList',{response:list});
    };
    
    render() {
        const { params } = this.props.navigation.state; 
        console.log("PlayList Screen Data Received "+params.response); 
        return (
            <FlatList
                data={params.response}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}