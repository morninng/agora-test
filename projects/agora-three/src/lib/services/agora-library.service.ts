import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, ReplaySubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AgoraClient } from '../class/agora-client';

import * as AgoraRTC from 'agora-rtc-sdk';

import { Stream } from '../class/stream';
import { JoinRoomData } from '../interface/join-room-data';

type AgoraClientCodec = 'vp8' | 'h264';
type AgoraClientMode = 'live' | 'rtc';

const agoraIoAppid = 'f5b81d3d190448c0a2b0db98186384ed';


@Injectable({
  providedIn: 'root'
})
export class AgoraLibraryService {

  client: AgoraClient;

  is_client_initialized_subject$: ReplaySubject<boolean>;
  is_localstream_created_subject$: ReplaySubject<boolean>;

  localStream: Stream;
  own_userid = null;
  audioEnabled = true;
  audioEnabledSubject$ = new BehaviorSubject(this.audioEnabled);
  room_name = '';

  enterRoomSubject$: Subject<JoinRoomData>;
  leaveRoomSubject$: Subject<void>;



  constructor() {
    this.is_client_initialized_subject$ = new ReplaySubject<boolean>(1);
    this.is_localstream_created_subject$ = new ReplaySubject<boolean>(1);
    this.enterRoomSubject$ = new ReplaySubject(1);
    this.leaveRoomSubject$ = new ReplaySubject(1);
  }

  get_agora_client() {
    return this.client;
  }

  before_enter(own_userid) {
    this.own_userid = own_userid;
    this.create_client();
    this.createLocalStream();
  }

  before_enter_done$(): Observable<boolean>{
    return combineLatest(this.is_client_initialized_subject$, this.is_localstream_created_subject$)
    .pipe(
      map(([is_client_initialized, is_stream_created]: [boolean, boolean]) => {
        return (is_client_initialized && is_stream_created);
        }
      ),
      filter((value) => {
        return value;
      })
    );
  }
  monitor_enter_room$(): Observable<JoinRoomData> {
    return this.enterRoomSubject$.asObservable();
  }
  monitor_leave_room$(): Observable<void> {
    return this.leaveRoomSubject$.asObservable();
  }

  enter_room(room_name) {

    if (this.room_name && this.room_name !== room_name) {
      this.leave(() => {
        this.enterRoomSubject$.next({room_name, own_uid: this.own_userid});
      });

    } else if (this.room_name && this.room_name === room_name) {
      // do nothing
    } else if (!this.room_name && room_name){

      this.enterRoomSubject$.next({room_name, own_uid: this.own_userid});
    }
    this.room_name = room_name;

  }




    // https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.clientconfig.html

  create_client(){
    const codec: AgoraClientCodec = 'h264';
    const mode: AgoraClientMode = 'rtc';

    this.client = AgoraRTC.createClient({mode, codec});


    this.client.init(agoraIoAppid,  () => {
      console.log('----AgoraRTC client initialized');
      this.is_client_initialized_subject$.next(true);

    }, (err) => {
      console.log('----AgoraRTC client init failed', err);
      this.is_client_initialized_subject$.next(false);

    });

    this.client.on('stream-published', (evt) => {
      console.log('---on-stream-published');

    });


    this.client.on('mute-audio', (evt) => {
      const uid = evt.uid;
      console.log(`----on-'mute-audio ${uid}`);
    });

    this.client.on('unmute-audio', (evt) => {
      const uid = evt.uid;
      console.log(`----on-'unmute-audio ${uid}`);
    });

    this.client.on('mute-video', (evt) => {
      const uid = evt.uid;
      console.log(`----on-mute-video${uid}`);
    });
    this.client.on('unmute-video', (evt) => {
      const uid = evt.uid;
      console.log(`----on-unmute-video${uid}`);
    });

    this.client.on('client-banned', (evt) => {
      const uid = evt.uid;
      const attr = evt.attr;
      console.log(`----on-client-banned ${uid} ${attr}`);
    });
    this.client.on('active-speaker', (evt) => {
      const uid = evt.uid;
      console.log(`----on-active-speaker ${uid}`);
    });
    this.client.on('volume-indicator', (evt) => {
      evt.attr.forEach( (volume, index) => {
        console.log(`----on-#{index} UID ${volume.uid} Level ${volume.level}`);
      });
    });
    this.client.on('liveStreamingStarted', (evt) => {
      console.log(`----on-liveStreamingStarted`);
    });

    this.client.on('liveStreamingFailed', (evt) => {
      console.log(`----on-liveStreamingFailed`);
    });
    this.client.on('liveStreamingStopped', (evt) => {
      console.log(`----on-liveStreamingStopped`);
    });

    this.client.on('liveTranscodingUpdated', (evt) => {
      console.log(`----on-liveTranscodingUpdated`);
    });
    this.client.on('onTokenPrivilegeWillExpire', (evt) => {
      console.log(`----on-onTokenPrivilegeWillExpire`);
    });
    this.client.on('onTokenPrivilegeDidExpire', (evt) => {
      console.log(`----on-onTokenPrivilegeDidExpire`);
    });
    this.client.on('error', (err) => {
      console.log(`----on-error ${ err.reason}`);

      alert(err.reason);


    });

    this.client.on('networkTypeChanged', (evt) => {
      console.log(`----on-networkTypeChanged ${evt.networkType}`);
    });
    this.client.on('recordingDeviceChanged', (evt) => {
      console.log(`----on- recordingDeviceChanged ${evt.state} ${evt.device}`);
    });

    this.client.on('playoutDeviceChanged', (evt) => {
      console.log(`----on-playoutDeviceChanged ${evt.state} ${evt.device}`);
    });
    this.client.on('cameraChanged', (evt) => {
      console.log(`----on-cameraChanged ${evt.state} ${evt.device}`);
    });
    this.client.on('streamTypeChange', (evt) => {
      console.log(`----on- streamTypeChange  ${evt.state} ${evt.device}`);
    });
  }





  createLocalStream() {

    let own_stream_id = '';
    if (this.own_userid) {
      own_stream_id = this.own_userid + '_s';
    } else {
      alert('no own uid');
    }

    // https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.streamspec.html

    console.log('----this.own_stream_id', own_stream_id);
    this.localStream = AgoraRTC.createStream({
      streamID: own_stream_id,
      audio: true,
      video: false,
      screen: false}
    );
    this.localStream.on('accessAllowed', () => {
      console.log('localStream accessAllowed');
    });
    // The user has denied access to the camera and mic.
    this.localStream.on('accessDenied', () => {
      console.log('localStream accessDenied');
    });


    this.localStream.init(
      () => {
        this.is_localstream_created_subject$.next(true);
        console.log('----getUserMedia successfully');
      },
      (err) => {
        this.is_localstream_created_subject$.next(false);
        console.log('----getUserMedia failed', err);
      }
    );
  }



  publishLocalStream() {
    if (!this.localStream) {
      return;
    }
    this.client.publish(this.localStream, (err) => {
      console.log('----Publish local stream error: ' + err);
    });
  }

  unpublishStream = () => {
    if (!this.localStream) {
      return;
    }
    this.client.unpublish(this.localStream, (err) => {
      console.log('----Publish local stream error: ' + err);
    });
  }

  get_audio_enabled$(): Observable<boolean> {
    return this.audioEnabledSubject$.asObservable();
  }

  toggleAudio() {
    const audioEnabled = !this.audioEnabledSubject$.getValue();
    this.audioEnabledSubject$.next(audioEnabled)
    if (audioEnabled) {
      this.localStream.enableAudio();
    } else {
      this.localStream.disableAudio();
    }
  }


  leave(callback: () => void ) {
    this.unpublishStream();
    this.leaveRoomSubject$.next();
    this.client.leave(
    () => {
      console.log('Leavel channel successfully');
      setTimeout(() => {
        callback();
      }, 500);
    },
    (err) => {
      console.log(`Leave channel failed`);
    });
  }


}
