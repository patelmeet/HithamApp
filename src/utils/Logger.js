import {
    NetInfo
  } from 'react-native';

import Rest from '../utils/Rest';
export default class Logger {
    static student_id = 1;
    static PLAY = "PLAY";

    static async record(rid,activity,time){
        try{
            if(NetInfo.isConnected.fetch()){
                let body = JSON.stringify({
                    student_id : "MT2016001",
                    recording_id : 1,
                    student_activity_type : activity,
                    student_activity_time : 1
                });
                let response = await Rest.post(logURL,body);
            }
        }catch(error){
            await console.log('Unable to record actiity:   '+error);

        }
    }
}