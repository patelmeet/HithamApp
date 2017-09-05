global.childID = 1;
global.serviceURL = "http://172.16.81.221:3000/";
global.driveFileId = "0B_-MwrFrWjn-TmpRSXpkeHJ0Szg";
global.driveViewURL = "https://drive.google.com/file/d/";
global.driveDownloadURL = "https://drive.google.com/uc?export=download&id=";

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