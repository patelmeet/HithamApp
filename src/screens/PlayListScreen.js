'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  AsyncStorage,
} from 'react-native';

class PlayListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item.playlist_songIDs);
  }

  render() {
    const item = this.props.item;
    console.log("item received "+JSON.stringify(item));
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.id}>{item.playlist_id}</Text>
              <Text style={styles.name}
                numberOfLines={1}>{item.playlist_name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}


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
        console.log('sending................................................ '+list);
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
const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  id: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  name: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});