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
import MusicPlayer from 'Hitham/src/class/MusicPlayer';

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
        this.showSongs();
    }

    showSongs(){
        NetInfo.isConnected.fetch().then((isConnected) => {
            if(isConnected){
                this.fetchSongsOnline();
            }
            else{
                this.showSongsOffline();
            }
        });
    }

    showSongsOffline(){
        console.log("----getting offline");
        var alllist = [];
        AsyncStorage.getAllKeys((err, keys) => {
            console.log("---"+keys.length);
            AsyncStorage.multiGet(keys, (err, stores) => {
             stores.map((result, i, store) => {
               let key = store[i][0];
               let value = store[i][1];
               alllist.push(JSON.parse(value));
              });
//              console.log("-----"+alllist);
              this.setStateforSong(alllist);
            });
          });
       return "offline";   
    }

    setStateforSong(alllist){
        this.setState({
            userSongSource: this.state.userSongSource.cloneWithRows(alllist)
        });
    }

    fetchSongsOnline(){
        console.log('----fetchSongsOnline called');
        console.log(serviceURL+'songs');
        fetch(serviceURL+'songs')
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                console.log("----service call finished");
                var alllist = [];
                if(response.length == 0){
                    return;
                }
                var curres;
                for(let i=0 ; i<response.length ; i++){
                    AsyncStorage.getItem(''+response[i].songlist_id , (err,item) => {
                        if(item){
                            //Already added
                            console.log('-----------if');
                            alllist.push(JSON.parse(item));
                        }
                        else{
                            //Add
                            var songid = ''+response[i].songlist_id;
                            console.log('-----------else');
                            curres = response[i];
                            curres['downloaded'] = false;
                            curres['downloadLoc'] = '';
                            AsyncStorage.setItem(songid,JSON.stringify(curres), (err) => {
                                if(err){
                                    console.log("---error"+err.message);
                                }
                                else{
                                    console.log("---Inserted Successfullly + "+ songid);
                                }
                            });
                            alllist.push(curres);
                        }
                        if( i == response.length-1){
                            this.setStateforSong(alllist);
                        }
                    });
                }
            });
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
            else{
                MusicPlayer.stop();
                this.playsong(song);
            }
        }
        else{
            this.playsong(song);
        }
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