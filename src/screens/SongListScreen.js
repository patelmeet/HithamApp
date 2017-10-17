import React , { Component } from 'react'
import { 
    View,  
    Button,
    AsyncStorage,
    NetInfo,
    FlatList,
    ScrollView
 } from 'react-native'

import MusicPlayer from '../utils/MusicPlayer';
import FileStore from '../utils/FileStore';
import SongListItem from '../components/SongListItem';
import PlayerComponent from '../components/PlayerComponent';

export default class SongListScreen extends Component {
    static navigationOptions = {
        title: 'My Songs', 
    };
    constructor(props){
        super(props);
        this.state = {
            songs:[],
            song:'',
            props:props,
        };
        this.updateSong = this.updateSong.bind(this);
    }


    updateSong(song){
        this.setState({song:song});
    }

    componentWillUnmount(){
        MusicPlayer.releaseHandler();
    }

    componentDidMount(){
        const { params } = this.props.navigation.state;   
        console.log('list of songs: '+params.response); 
        this.loadSongs(params.response);
        if(MusicPlayer.isPlaying)
            this.updateSong(MusicPlayer.song);
    }

    _keyExtractor = (item,index) => index;
    
    _renderItem = (item,index) => (
        <SongListItem
            item={item.item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    async playsong(song){
        if(song[SONG_IS_DOWNLOADED] != true){
            //Download and then play
            var song = await FileStore.downloadSong(song);
            await AsyncStorage.setItem(''+song[SONG_ID],JSON.stringify(song));
        }
        await MusicPlayer.playNew(song,this.updateSong);
        return true;
    }

    _onPressItem = (song) => {
        console.log('----onSongPress pressed && isplaying = '+MusicPlayer.isPlaying);
        //console.log('song data: '+JSON.stringify(song));
        if(MusicPlayer.isPlaying == true){
            if(MusicPlayer.song[SONG_ID] == song[SONG_ID])
                return;
            else
                MusicPlayer.stop();
        }
        this.playsong(song);
    };

    async loadSongs(list){
        try{
        alllist = [];
        await console.log('loading list: '+list);
        for(var index = 0 ; index < list.length; index++ ){
            await console.log('getting id '+list[index]);
            let item = await AsyncStorage.getItem(''+list[index]);
            await console.log('key is '+index+' item is '+item);
            await alllist.push(JSON.parse(item));
        }
        await this.setState({songs: alllist });
        await console.log('songs in the playlist: '+JSON.stringify(alllist));
        }catch(error){
            console.log(error);
        }
    } 

    render() {

        return (
            <View style = {{justifyContent: 'space-between', flex:1,flexDirection :'column'}}>
                <ScrollView>
                <FlatList
                    data={this.state.songs}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                /></ScrollView>
                <View>
                <PlayerComponent songDuration={MusicPlayer.getDuration()} song={MusicPlayer.song}/>
                </View>
            </View >
        );
    }
}