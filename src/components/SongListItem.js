import React , { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableHighlight, 
    Image
 } from 'react-native'


export default class SongListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.item);
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
              <Image style={styles.thumb} source = {{uri: 'file://'+item.songlist_pic_downloadLoc}}/>
              <View style={styles.textContainer}>
                <Text style={styles.id}>{item.songlist_name}</Text>
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
      height: 50,
      marginRight:10
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