'use strict';

import React, { Component } from 'react'
import { FlatList } from 'react-native';
import PlayListItem from '../components/PlayListItem';

export default class PlayListScreen extends Component {
    static navigationOptions = {
        title: 'My PlayLists', 
      };
      
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
        console.log('sending... '+list);
        navigate('SongList',{response:list});
      };
    
      render() {
          const { params } = this.props.navigation.state; 
          console.log("data received "+params.response); 
          return (
              <FlatList
                  data={params.response}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
              />
          );
      }
}