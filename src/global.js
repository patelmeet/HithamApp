global.childID = 1;
global.serviceURL = "http://172.16.82.145:8080/hitham/webapi/songlist"
//global.serviceURL = "http://ehrc-dev.iiitb.ac.in/hitham/webapi/songlist"
global.logURL = "http://172.16.82.145:8080/hitham/webapi/studentActivity/logActivity"
//global.logURL = "http://ehrc-dev.iiitb.ac.in/hitham/webapi/studentActivity/logActivity"
global.driveFileId = "0B_-MwrFrWjn-TmpRSXpkeHJ0Szg";
global.driveViewURL = "https://drive.google.com/file/d/";
global.driveDownloadURL = "https://drive.google.com/uc?export=download&id=";
global.DEFAULT_SONG = JSON.parse('{"recording_id":1,"song_id":3,"recording_name":"RAMAKRISHNARU_1","recording_pic_url":"https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZblJweG1mMFJ3TE0","song_taal":"ata","song_composer":"ramanujam","song_name":"RAMAKRISHNARU","song_singer":"K.Yesudas","song_url":"https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZck9vYU9QUEttMXc","recording_color":"#000066","song_raaga":"Amrithavarshini"}');
global.NO_IMAGE_PATH = '../images/No_Image_Available.jpg';
global.LIST = "p1";
global.GRID = "p2";
global.DEFAULT_PROFILE = "p1";

function encryptme(pass)
{
	var hash = 0;
	for (i = 0; i < pass.length; i++) {
		char = pass.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
global.encryptme = encryptme;