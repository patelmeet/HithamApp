import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Slider,
  Button,
  TouchableHighlight
} from 'react-native';

import MusicPlayer from '../utils/MusicPlayer';

export default class PlayerComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            currentSong : this.props.song
        };
        
    };

    onPressPlayPauseButton(){
        console.log('----onPressPlayPauseButton pressed');
        MusicPlayer.toggle();
    }

    render() {
        console.log('player render '+JSON.stringify(this.props.song));
        return (
        
                    <View style={styles.rowContainer} >
                        <View>
                            <Image 
                            style = { styles.thumb }
                            source={{ uri : 'file://'+this.state.currentSong.songlist_pic_downloadLoc }} />
                        </View>
                        <View style={styles.separator}/>
                        <View style={{flexGrow:1}}>
                            <View>
                                <Text style = {styles.name} > {this.props.song.songlist_name} </Text>
                            </View>
                            <View style={styles.separator}/>
                            <View style={{width:80,marginLeft:5}}>
                                <Button title='Pause' onPress={this.onPressPlayPauseButton}/>
                            </View>
                            <View style={styles.separator}/>
                            <View >
                            <Slider
                                    value={0 }
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor={'#009688'}
                                    maximumTrackTintColor={'#4caf50'}
                            />
                            </View>
                            <View style={styles.separator}/>
                        </View>
                    </View>
                
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
        height: 5,
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
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },

});