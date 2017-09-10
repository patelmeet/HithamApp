import React , { Component } from 'react'
import { 
    View,  
    Button,
    AsyncStorage,
    NetInfo,
    FlatList
 } from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob';
import MusicPlayer from '../utils/MusicPlayer';
import SongListItem from '../components/SongListItem';

export default class SongListScreen extends Component {
    static navigationOptions = {
        title: 'My Songs', 
    };
    constructor(props){
        super(props);
        this.state = {
            songs:[],
            isplaying: false,
            playingsongID:0,
            cururl: ""
        };
    }
      
    componentDidMount(){
        const { params } = this.props.navigation.state;    
        this.loadSongs(params.response);
    }

    _keyExtractor = (item,index) => index;
    
    _renderItem = (item,index) => (
        <SongListItem
            item={item.item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    playsong(song){
        if(song['downloaded'] == true){
            MusicPlayer.playNew(song.downloadLoc);
        }
        else{
            //Download and then play
            console.log('----Downloading')
            RNFetchBlob.config({fileCache : true})
                .fetch('GET',song.songlist_url,{})
                .then((res) => {
                    console.log('----download successful');
                    song['downloaded']=true;
                    song['downloadLoc']=res.path();
                    AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(song));
                    console.log("----Playing");
                    MusicPlayer.playNew(res.path());
                })
        }
        this.setState({cururl : song.songlist_url , playingsongID : song.songlist_id ,isplaying : true});
    }

    _onPressItem = (song) => {
        console.log('----onSongPress pressed && isplaying = '+this.state.isplaying);
        console.log('song data: '+JSON.stringify(song));
        if(this.state.isplaying == true){
            if(this.state.playingsongID == song.songlist_id)
                return;
            else
                MusicPlayer.stop();
        }
        this.playsong(song);
    };

    async loadSongs(list){
        try{
        alllist=[];
        for(index in list){
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
    
    onPressPlayPauseButton(){
        console.log('----onPressPlayPauseButton pressed');
        MusicPlayer.toggle();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.songs}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                <Button title="Play/Pause" onPress={this.onPressPlayPauseButton.bind(this)}/>
            </View>
        );
    }
}