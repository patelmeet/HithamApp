import React , { Component } from 'react';
import FileStore from '../utils/FileStore';
import MusicPlayer from '../utils/MusicPlayer';
import PlayerComponent from './PlayerComponent';
import Toast from 'react-native-simple-toast';
import { 
    Text, 
    StyleSheet, 
    View, 
    AsyncStorage,
    TouchableHighlight, 
    ActivityIndicator,
    Image
 } from 'react-native';

const NOT_DOWNLOADED = 1;
const DOWNLOADING = 2;
const DOWNLOADED = 3;


export default class SongListItem extends React.PureComponent {
  
  constructor(props){
    super(props);
    this.state = {
        song:'',
        downloadState:NOT_DOWNLOADED,
    };
  }

  getDownloadState(s){
    if(s==true)
      return DOWNLOADED;
    return NOT_DOWNLOADED;
  }

  componentDidMount(){
    this.setState({song: this.props.item,downloadState:this.getDownloadState(this.props.item[SONG_IS_DOWNLOADED])});     
  }

  async playsong(){
    if(this.state.song[SONG_IS_DOWNLOADED] != true){
        this.setState({downloadState:DOWNLOADING});
        Toast.show('Downloading song...', Toast.LONG);
        let updatedSong = await FileStore.downloadSong(this.state.song);
        if(updatedSong == null){
            Toast.show('Unable to download', Toast.LONG);
            this.setState({downloadState:NOT_DOWNLOADED});
            return;
        }
        await AsyncStorage.setItem(''+this.state.song[SONG_ID],JSON.stringify(updatedSong));
        this.setState({song:updatedSong,downloadState:DOWNLOADED});
        await MusicPlayer.playNew(updatedSong);    
    }
    else{
      await MusicPlayer.playNew(this.state.song);
      PlayerComponent.setCompSong(this.state.song,true);
    }
  }

    _onPress = () => {
      if(this.state.downloadState==DOWNLOADING)
        return;
      if(MusicPlayer.isplaying == true){
//        console.log("song already playing..." +MusicPlayer.song[SONG_ID] +"new song: "+song[SONG_ID] );
        if(MusicPlayer.song[SONG_ID] == this.state.song[SONG_ID])
            return;
        else
            MusicPlayer.stop();
    }
    PlayerComponent.setCompSong(this.state.song,false);
    this.playsong();
    }
  
    render() {
      const item = this.state.song;
      const spinner = this.state.downloadState==DOWNLOADING ?
      <ActivityIndicator size='large'/> : null;
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View  backgroundColor={item[SONG_COLOR]}>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source = {{uri: 'file://'+item[SONG_ICON_PATH]}}/>
              <View style={styles.textContainer}>
              <Text style={styles.id}>{item[SONG_NAME]}</Text>
              </View>
              {spinner}
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