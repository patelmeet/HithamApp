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
import DataStore from '../utils/DataStore';
import SongListItem from '../components/SongListItem';
import SongGridItem from '../components/SongGridItem';
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
            profileName:DEFAULT_PROFILE
        };
        this.updateSong = this.updateSong.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }


    updateSong(song){
        this.setState({song:song});
    }

    updateProfile(val){
        this.setState({profileName:val});
    }

    componentWillUnmount(){
        MusicPlayer.releaseHandler();
    }

    componentDidMount(){
        const { params } = this.props.navigation.state;   
        this.loadSongs(params.response);
        if(MusicPlayer.isPlaying)
            this.updateSong(MusicPlayer.song);
    }

    _keyExtractor = (item,index) => index;
    
    _renderListItem = (item,index) => (
        <SongListItem
            item={item.item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    _renderGridItem = (item,index) => (
        <SongGridItem
            item={item.item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    async playsong(song){
        if(song['downloaded'] != true){
            //Download and then play
            let updatedSong = await FileStore.downloadSong(song);
            await AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(updatedSong));
        }
        await MusicPlayer.playNew(song,this.updateSong);
        return true;
    }

    _onPressItem = (song) => {
//        console.log('song pressed data: '+JSON.stringify(song));
        if(MusicPlayer.isplaying == true){
            if(MusicPlayer.song.playingsongID == song.songlist_id)
                return;
            else
                MusicPlayer.stop();
        }
        this.playsong(song,this.updateSong);
    };

    async loadSongs(list){
        try{
            DataStore.setProfile(this.updateProfile);    
            alllist = [];
//        await console.log('loading list: '+list);
            for(var index = 0 ; index < list.length; index++ ){
                let item = await AsyncStorage.getItem(''+list[index]);
                await alllist.push(JSON.parse(item));
            }
            await this.setState({songs: alllist });
//          await console.log('songs in the playlist: '+JSON.stringify(alllist));
        }catch(error){
            console.log(error);
        }
    } 

    render() {

        let listview = null;
        console.log('comparing: '+this.state.profileName+' and '+LIST);
        if (this.state.profileName == LIST)
            listview = <FlatList 
                            data={this.state.songs}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderListItem}
                        />
        else
            listview = <FlatList style={{margin:10}}
                            data={this.state.songs}
                            numColumns={2}
                            key='h'
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderGridItem}
                        />;
       
        return (
            <View style = {{justifyContent: 'space-between', flex:1,flexDirection :'column'}}>
                <ScrollView>
                    {listview}
                </ScrollView>
                <View>
                <PlayerComponent songDuration={MusicPlayer.getDuration()} song={MusicPlayer.song}/>
                </View>
            </View >
        );
    }
}