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
    AsyncStorage
 } from 'react-native'

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
        fetch(serviceURL+'songs')
            .then((response) => response.json())
            .then((response) => {
//                console.log("----service call finished");
                var alllist = [];
                if(response.length == 0)
                    return;
                var curres;
                for(let i=0 ; i<response.length ; i++){
                    var songid = ''+response[i].songlist_id;
                    AsyncStorage.getItem(songid).then((item) => {
                        if(item){
                            //Already added
                            console.log('-----------if');
                            alllist.push(JSON.parse(item));
                        }
                        else{
                            //Add
                            console.log('-----------else');
                            curres = response[i];
                            curres['downloaded'] = false;
                            curres['downloadLoc'] = '';
                            AsyncStorage.setItem(songid,JSON.stringify(curres));
                            alllist.push(curres);
                        }
                        if( i == response.length-1){
                            this.setState({
                                userSongSource: this.state.userSongSource.cloneWithRows(alllist)
                            });
                        }
                    })
                    
                }
            });
    }

    playsong(song){
        if(song['downloaded'] == true){
            console.log('----inside true');
            whoosh = new Sound(song.downloadLoc , Sound.MAIN_BUNDLE, (error) => {
                if(error){
                    console.log('failed to load');return;
                }
                this.setState({cururl : song.songlist_url , playingsongID : song.songlist_id ,isplaying : true});
                whoosh.play( (success) => {
                    if(success){
                        this.setState({isplaying: false});
                    }
                })
            })
        }
        else{
            //Download and then play
            console.log('----inside else')
            RNFetchBlob.config({fileCache : true})
                .fetch('GET',song.songlist_url,{})
                .then((res) => {
                    console.log('----download successful');
                    song['downloaded']=true;
                    song['downloadLoc']=res.path();
                    AsyncStorage.setItem(''+song.songlist_id,JSON.stringify(song));
                    whoosh = new Sound(res.path() , Sound.MAIN_BUNDLE, (error) => {
                        if(error){
                            console.log('failed to load');return;
                        }
                        this.setState({cururl : song.songlist_url , playingsongID : song.songlist_id ,isplaying : true});
                        whoosh.play( (success) => {
                            if(success){
                                this.setState({isplaying: false});
                            }
                        })
                    })
                })
        }
    }

    onSongPress(song){
        console.log('----onSongPress pressed && isplaying = '+this.state.isplaying);
        console.log(JSON.stringify(song));
        if(this.state.isplaying == true){
            if(this.state.playingsongID == song.songlist_id)
                return;
            else
                whoosh.stop(() => {
                    this.playsong(song);
                });
        }
        else{
            this.playsong(song);
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