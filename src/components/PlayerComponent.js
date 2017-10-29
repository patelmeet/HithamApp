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
import Logger from '../utils/Logger';
var songPercentage = 0;

export default class PlayerComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            currentSong : this.props.song,
            sliding : false,
            currentTime : 0,
            songDuration : 0,
        };
        
    };

    onSlidingStart(){
        console.log('onslidingstart');
//        this.setState({ sliding: true });
    }
    
    onSlidingChange(value){
        console.log('onslidingchange'+value);
        let newPosition = value * MusicPlayer.getDuration();
        this.setState({ currentTime: newPosition });
        MusicPlayer.player.setCurrentTime( newPosition );
    }
    
    onSlidingComplete(){
        console.log('onslidingcomplete');
        MusicPlayer.player.getCurrentTime( (seconds) => {
            Logger.record(MusicPlayer.song[SONG_ID],"MOVED_TO_POSITION",seconds);
        }); 

//        this.refs.audio.seek( this.state.currentTime );
//        this.setState({ sliding: false });
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     return (nextState.currentTime-this.state.currentTime>1);
    // }

    onPressPlayPauseButton(){
        console.log('----onPressPlayPauseButton pressed');
        MusicPlayer.toggle();
    }

    componentDidMount(){
        console.log('componentdidmount');
        this.interval = setInterval( () => this.setState( { time:Date.now()}) , 1000);
        if(this.state.currentSong[SONG_ID] != 0 && MusicPlayer.player!=null){
            MusicPlayer.player.getCurrentTime( (seconds) => {
                if(this.state.currentSong[SONG_ID] != 0){
                    this.setState({ currentTime : seconds });
                }
            });
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    render() {
//        console.log('player render ');
        
        if(MusicPlayer.player != null ){
            MusicPlayer.player.getCurrentTime( (seconds) => {
                //console.log('render '+seconds+' '+this.props.songDuration);
                    songPercentage = seconds/MusicPlayer.getDuration();
            });
        }
        console.log('render '+songPercentage);
        
        return (
        
                    <View style={styles.rowContainer} >
                        <View>
                            <Image 
                            style = { styles.thumb }
                            source={{ uri : 'file://'+this.props.song[SONG_ICON_PATH]}} />
                        </View>
                        <View style={styles.separator}/>
                        <View style={{flexGrow:1}}>
                            <View>
                                <Text style = {styles.name} > {this.props.song[SONG_NAME]} </Text>
                                <View>
                                    <Text style={{color:'white'}}>{ Math.floor(MusicPlayer.getDuration()/60) }:{ Math.floor(MusicPlayer.getDuration()%60) }</Text>
                                </View>
                            </View>
                            <View style={styles.separator}/>
                            <View style={{width:80,marginLeft:5}}>
                                <Button title='Pause' onPress={this.onPressPlayPauseButton}/>
                            </View>
                            <View style={styles.separator}/>
                            <View >
                                <Slider
                                onSlidingStart={ this.onSlidingStart.bind(this) }
                                onSlidingComplete={ this.onSlidingComplete.bind(this) }
                                onValueChange={ this.onSlidingChange.bind(this) }
                                minimumTrackTintColor='#851c44'
                                style={ styles.slider }
                                trackStyle={ styles.sliderTrack }
                                thumbStyle={ styles.sliderThumb }
                                value={ songPercentage }/>
                                

                            </View>


                            {/* <Slider
                                    value={0 }
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor={'#009688'}
                                    maximumTrackTintColor={'#4caf50'}
                                    thumbTintColor = {'#87ceff'}
                            /> */}
                            
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
    name: {
        color: '#48BBEC',
        fontWeight: 'bold',
        fontSize: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor : 'black'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    sliderTrack: {
        height: 2,
        backgroundColor: '#333',
      },
      sliderThumb: {
        width: 10,
        height: 10,
        backgroundColor: '#f62976',
        borderRadius: 10 / 2,
        shadowColor: 'red',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
      }
});