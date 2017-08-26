import React , { Component } from 'react'
import { AppRegistry, Text, TextInput, StyleSheet, View, ListView, Button,TouchableHighlight } from 'react-native'

import Sound from 'react-native-sound'
import RNFetchBlob from 'react-native-fetch-blob'

var whoosh;

export default class SongList extends Component {

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
        this.fetchSongsOnline();
    }

    fetchSongsOnline(){
        console.log('----fetchSongsOnline called')
        fetch(serviceURL+'HITHAM/webapi/SongList/1')
            .then((response) => response.json())
            .then((response) => {
                console.log("----service call finished");

                this.setState({
                    userSongSource: this.state.userSongSource.cloneWithRows(response)
                });
            });
    }

    onSongPress(song){
        console.log('----onSongPress pressed');
        if(this.state.isplaying == true){
            if(this.state.playingsongID == song.songlist_id){
                //DO-Nothing
            }
            else{
                whoosh.stop();

                this.setState({isplaying : false});
            }
        }
        else{
            console.log('-----false --'+song.songlist_url);
            this.setState({cururl : song.songlist_url , playingsongID : song.songlist_id ,isplaying : true});
            whoosh = new Sound(song.songlist_url , Sound.MAIN_BUNDLE , (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } 
                // loaded successfully
                console.log('loaded succesfully');
                whoosh.play( (success) => { if(success){ this.setState({isplaying: false}) }} );
            });
//            if(whoosh.isLoaded() == true){
//                whoosh.play( (success) => { if(success){ this.setState({isplaying: false}) }} );
//            }
//            else{
//                console.log("----Not loaded")
//            }
        }
    }

    onPressPlayPauseButton(){
        console.log('----onPressPlayPauseButton pressed');
        if(this.state.isplaying == true){
            whoosh.pause();
            this.setState({isplaying : false});
        }
        else{
            if(this.state.playingsongID == 0)
                return;
            this.setState({isplaying : true});
            if(whoosh.isLoaded() == true)
            whoosh.play( (success) => { if(success){ this.setState({isplaying: false}) }} );
        }
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