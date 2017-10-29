import {
    NetInfo
  } from 'react-native';
import MusicPlayer from '../utils/MusicPlayer';
import Rest from '../utils/Rest';
import User from '../utils/User';
export default class Logger {

    static async record(rid,activity,time){
        try{
            if(NetInfo.isConnected.fetch()){
                let body = JSON.stringify({
                    student_pk : User.getStudentPK(),
                    recording_id : MusicPlayer.getRecordingID(),
                    student_activity_type : activity,
                    student_activity_time : Math.round(time * 100) / 100.0,
                });
                let response = await Rest.post(logURL,body);
            }
        }catch(error){
            await console.log('Unable to record activity:   '+error);

        }
    }
}