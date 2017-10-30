import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

export default class PlayListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.item[PLAYLIST_SONGS]);
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
                <Text style={styles.id}>{item[PLAYLIST_NAME]}</Text>
                <Text style={styles.name}
                  numberOfLines={1}>{item[PLAYLIST_SONGS].length} songs</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
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