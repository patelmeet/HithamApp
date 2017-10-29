import React , { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableHighlight, 
    Image
 } from 'react-native'


export default class SongGridItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.item);
    }

    render() {
      const item = this.props.item;
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View  backgroundColor={item[SONG_COLOR]}>
            <View style={stylesDefault.rowContainer}>
              <Image style={stylesDefault.thumb} source = {{uri: 'file://'+item[SONG_ICON_PATH]}}/>
            </View> 
          </View>
        </TouchableHighlight>
      );
    }
  }
  const stylesDefault = StyleSheet.create({
    thumb: {
      width: 130,
      height: 100,
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 15,
      borderWidth: 4,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

  const styles = StyleSheet.create({
    thumb: {
      width: 80,
      height: 60,
      marginRight:10
    },
    textContainer: {
      flex: 1
    },
    id: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#48BBEC'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 4,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });