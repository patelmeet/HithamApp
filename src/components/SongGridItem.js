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
 } from 'react-native'

 const NOT_DOWNLOADED = 1;
 const DOWNLOADING = 2;
 const DOWNLOADED = 3;

export default class SongGridItem extends React.PureComponent {
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
        let song = this.state.song;
        let updatedSong = await FileStore.downloadSong(song);
        if(updatedSong == null){
            Toast.show('Unable to download', Toast.LONG);
            this.setState({downloadState:NOT_DOWNLOADED});
            return;
        }
        await AsyncStorage.setItem(''+this.state.song[SONG_ID],JSON.stringify(updatedSong));
        this.setState({song:updatedSong,downloadState:DOWNLOADED});
        await PlayerComponent.setCompSong(this.state.song,true);
        await MusicPlayer.playNew(updatedSong);    
    }
    else{
      PlayerComponent.setCompSong(this.state.song,true);
      MusicPlayer.playNew(this.state.song);
      
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
      <ActivityIndicator size='large'/> : (this.state.downloadState==DOWNLOADED?
      <View backgroundColor='#14c105' style={styles.spinnerContainer}/>:
      <View backgroundColor='#995A20' style={styles.spinnerContainer}/>);
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View  backgroundColor={item[SONG_COLOR]}>
            <View style={stylesDefault.rowContainer}>
              <Image style={stylesDefault.thumb} source = {{uri: 'file://'+item[SONG_ICON_PATH]}}>
              <View style={styles.spinnerContainer}>
              {spinner}
              </View>
              </Image>
            </View> 
            
          </View>
        </TouchableHighlight>
      );
    }
  }
  const stylesDefault = StyleSheet.create({
    thumb: {
      flexDirection: 'row',
      width: 130,
      height: 100,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 15,
      borderWidth: 4,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
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
    spinnerContainer:{
      width: 30,
      height: 30,
    },
  });