global.childID = 1;
//global.serviceURL = "http://172.16.81.221:3000/userdata";
global.serviceURL = "http://172.16.82.35:8080/HITHAM/webapi/songlist/MT2016004"
global.driveFileId = "0B_-MwrFrWjn-TmpRSXpkeHJ0Szg";
global.driveViewURL = "https://drive.google.com/file/d/";
global.driveDownloadURL = "https://drive.google.com/uc?export=download&id=";
global.defaultSong = JSON.parse('{"songlist_id":0,"songlist_url":"","songlist_name":"Default","songlist_pic_url":"","songlist_song_color":"","downloaded":false,"downloadLoc":"","songlist_pic_downloadLoc":"/data/user/0/com.hitham/files/RNFetchBlobTmp_gd1y9cv303o5mgtaw77w2a.jpg"}');

import RNFetchBlob from 'react-native-fetch-blob';

const myfetch = (fileURL, fileType) => {
//    console.log("Inside myfetch"+fileURL+fileType);
    RNFetchBlob
		  .config({
		    // add this option that makes response data to be stored as a file,
		    // this is much more performant.
		    fileCache : true,
		    
		  })
		  .fetch('GET', fileURL, {
		    //some headers ..
		  })
		  .then((res) => {
		    // the temp file path
            console.log('The file saved to ', res.path())
            return res.path();
          })
};
global.myfetch = myfetch;