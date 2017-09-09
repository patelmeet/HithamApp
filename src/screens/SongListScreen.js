import React , { Component } from 'react'
import { 
    AppRegistry, 
    Text, 
    TextInput, 
    StyleSheet, 
    View, 
    ListView, 
    Button,
    TouchableHighlight, 
    AsyncStorage,
    NetInfo
 } from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob';
import MusicPlayer from '../utils/MusicPlayer';

export default class SongListScreen extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            userSongSource: ds,
            isplaying: false,
            playingsongID:0,
            cururl: ""
        };
    }

    componentDidMount(){
        this.showSongs();
    }

    setStateforSong(alllist){
        this.setState({
            userSongSource: this.state.userSongSource.cloneWithRows(alllist)
        });
    }

    async showSongs(){
        try{
        const { params } = this.props.navigation.state;    
        await console.log("----loading songs "+JSON.stringify(params.response));
        alllist=[];
        for(index in params.response){
            let item = await AsyncStorage.getItem(''+params.response[index]);
            await console.log('key is '+index+' item is '+item);
            await alllist.push(JSON.parse(item));
        }
        await this.setStateforSong(alllist);
        await console.log('songs in the playlist: '+JSON.stringify(alllist));
        }catch(error){
            console.log(error);
        }
    } 

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

    onSongPress(song){
        console.log('----onSongPress pressed && isplaying = '+this.state.isplaying);
        console.log(JSON.stringify(song));
        if(this.state.isplaying == true){
            if(this.state.playingsongID == song.songlist_id)
                return;
            else
                MusicPlayer.stop();
        }
        this.playsong(song);
    }

    onPressPlayPauseButton(){
        console.log('----onPressPlayPauseButton pressed');
        MusicPlayer.toggle();
    }

    renderRow(song, sectionId, rowId, highlightRow){
        return(
            <TouchableHighlight onPress={() => {this.onSongPress(song)}}>
            <View style={styles.row}>
                <Text style={styles.rowText}>{song.songlist_name}</Text>
            </View>
            </TouchableHighlight>
        )
    }

    render() {
        return(
            <View>
                <ListView 
                    dataSource={this.state.userSongSource}
                    renderRow={this.renderRow.bind(this)}
                />
                <Button title="Play/Pause" onPress={this.onPressPlayPauseButton.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        backgroundColor: '#f4f4f4',
        marginBottom:3
    },
    rowText: {
        flex:1
    }
})

AppRegistry.registerComponent('SongList', () => SongList )