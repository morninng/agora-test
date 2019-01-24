import { Injectable } from '@angular/core';

import * as AgoraRTC from 'agora-rtc-sdk';
import { BehaviorSubject, Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

type AgoraClientCodec = 'vp8' | 'h264';
type AgoraClientMode = 'live' | 'rtc';

const agoraIoAppid = 'f5b81d3d190448c0a2b0db98186384ed';

export type AgoraStream = any;


@Injectable({
  providedIn: 'root'
})
export class AgoraIoService {


  _client = null;
  _localStream = null;

  is_initialized = false;
  is_initialized_subject$: ReplaySubject<boolean>;
  is_initialized_observable$: Observable<boolean>;

  is_room_joined = false;
  is_room_joined_subject$: ReplaySubject<boolean>;
  is_room_joined_observable$: Observable<boolean>;


  is_localstream_created_subject$: ReplaySubject<boolean>;
  is_localstream_created_observable$: Observable<boolean>;






  _own_uid = null;
  _own_stream_id = null;
  remote_subscribed_stream_arr_subject$: BehaviorSubject<AgoraStream[]>;
  remote_subscribed_stream_arr_observable$: Observable<AgoraStream[]>;
  remote_added_stream_arr_subject$: BehaviorSubject<AgoraStream[]>;
  remote_added_stream_arr_observable$: Observable<AgoraStream[]>;



  _remote_stream_added_id_arr = [];
  _remote_stream_arr = [];
  // _is_joined = false;
  _is_published = false;

  is_speaker_on = true;
  _is_microphone_on = true;

  get_is_microphone_on() {
    return this._is_microphone_on;
  }

  get own_stream_id(): string {
    return this._own_stream_id || '';
  }
  get localStream_id(): string {
    return this._localStream.getId() || '';
  }


  get_is_published(): boolean {
    return this._is_published;
  }

  get remote_stream_arr() {
    return this._remote_stream_arr || [];
  }

  get remote_stream_added_id_arr() {
    return this._remote_stream_added_id_arr || [];
  }

  get_remote_subscribed_streams$(): Observable<AgoraStream> {
    return this.remote_subscribed_stream_arr_observable$;
  }
  get_remote_added_stream$(){
    return this.remote_added_stream_arr_observable$;
  }

  get_is_initialized(){
    return this.is_initialized;
  }

  constructor() {
    // this.initialize();

   }

   enter_webrtc_beforeenter(own_uid){
     this.initialize_subject();
     this.initialize_webrtc();
     this.create_stream(own_uid);
   }
   monitor_webrtc_enter$() {

    return combineLatest(this.is_initialized_observable$, this.is_localstream_created_observable$)
    .pipe(
      filter(([is_initialized, is_localstream_created]: [boolean, boolean]) => {

        if (is_initialized && is_localstream_created) {
          return true;
        } else {
          return false;
        }
      })
      // filter((value) => {
      //   return value;
      // })
    );
   }


   initialize_subject() {
    this.remote_subscribed_stream_arr_subject$ = this.remote_subscribed_stream_arr_subject$ || new BehaviorSubject([]);
    this.remote_subscribed_stream_arr_observable$ = this.remote_subscribed_stream_arr_subject$.asObservable();

    this.remote_added_stream_arr_subject$ = this.remote_added_stream_arr_subject$ || new BehaviorSubject([]);
    this.remote_added_stream_arr_observable$ = this.remote_added_stream_arr_subject$.asObservable();

    

    this.is_initialized = false;
    this.is_initialized_subject$ = this.is_initialized_subject$ || new ReplaySubject(0);
    this.is_initialized_observable$ = this.is_initialized_subject$.asObservable();

    this.is_room_joined = false;
    this.is_room_joined_subject$ = this.is_room_joined_subject$ || new ReplaySubject(0);
    this.is_room_joined_observable$ = this.is_room_joined_subject$.asObservable();

    this.is_localstream_created_subject$ =  this.is_localstream_created_subject$  || new ReplaySubject(0);
    this.is_localstream_created_observable$ = this.is_localstream_created_subject$.asObservable();
   }

   complete_subject(){

    if(this.remote_subscribed_stream_arr_subject$){
      this.remote_subscribed_stream_arr_subject$.complete();
      this.remote_subscribed_stream_arr_subject$ = null;
      this.remote_subscribed_stream_arr_observable$ = null;
    }

    if(this.remote_added_stream_arr_subject$){
      this.remote_added_stream_arr_subject$.complete();
      this.remote_added_stream_arr_subject$ = null;
      this.remote_added_stream_arr_observable$ = null;
    }

    if(this.is_initialized_subject$) {
      this.is_initialized_subject$.complete();
      this.is_initialized_subject$ = null;
      
    }
    if(this.is_room_joined_subject$) {
      this.is_room_joined_subject$.complete();
      this.is_room_joined_subject$ = null;
    }
    if(this.is_localstream_created_subject$) {
      this.is_localstream_created_subject$.complete();
      this.is_localstream_created_subject$ = null;
    }
   }


  initialize_webrtc() {

    if (this.is_initialized) {
      return;
    }


    // https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.clientconfig.html

    const codec: AgoraClientCodec = 'h264';
    const mode: AgoraClientMode = 'rtc';

    this._client = AgoraRTC.createClient({mode, codec});

    this._client.on('stream-published', (evt) => {
      console.log('---on-stream-published');

      this._client.getLocalAudioStats((stats) => {
        console.log('----getLocalAudioStats', stats);
      });
    });

    this._client.on('stream-added', (evt) => {
      const stream = evt.stream;
      console.log('--on--stream-added: ' + stream.getId());
      this.onStreamAdded(stream);
    });

    this._client.on('stream-removed', (evt) => {
      const stream = evt.stream;
      console.log(`----on-stream-removed ${stream.getId()}`);
      this.onStreamRemoved(stream);
    });

    this._client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      console.log(`----on-stream-subscribed  ${stream.getId()}`);
      this.onStreamSubscribed(stream);
    });

    this._client.on('peer-leave', (evt) => {
      const uid = evt.uid;
      console.log(`----on-peer-leave ${uid}`);
      this.onUserLeave(uid);
    });

    this._client.on('mute-audio', (evt) => {
      const uid = evt.uid;
      console.log(`----on-'mute-audio ${uid}`);
    });

    this._client.on('unmute-audio', (evt) => {
      const uid = evt.uid;
      console.log(`----on-'unmute-audio ${uid}`);
    });

    this._client.on('mute-video', (evt) => {
      const uid = evt.uid;
      console.log(`----on-mute-video${uid}`);
    });
    this._client.on('unmute-video', (evt) => {
      const uid = evt.uid;
      console.log(`----on-unmute-video${uid}`);
    });

    this._client.on('client-banned', (evt) => {
      const uid = evt.uid;
      const attr = evt.attr;
      console.log(`----on-client-banned ${uid} ${attr}`);
    });
    this._client.on('active-speaker', (evt) => {
      const uid = evt.uid;
      console.log(`----on-active-speaker ${uid}`);
    });
    this._client.on('volume-indicator', (evt) => {
      evt.attr.forEach( (volume, index) => {
        console.log(`----on-#{index} UID ${volume.uid} Level ${volume.level}`);
      });
    });
    this._client.on('liveStreamingStarted', (evt) => {
      console.log(`----on-liveStreamingStarted`);
    });

    this._client.on('liveStreamingFailed', (evt) => {
      console.log(`----on-liveStreamingFailed`);
    });
    this._client.on('liveStreamingStopped', (evt) => {
      console.log(`----on-liveStreamingStopped`);
    });

    this._client.on('liveTranscodingUpdated', (evt) => {
      console.log(`----on-liveTranscodingUpdated`);
    });
    this._client.on('onTokenPrivilegeWillExpire', (evt) => {
      console.log(`----on-onTokenPrivilegeWillExpire`);
    });
    this._client.on('onTokenPrivilegeDidExpire', (evt) => {
      console.log(`----on-onTokenPrivilegeDidExpire`);
    });
    this._client.on('error', (err) => {
      console.log(`----on-error ${ err.reason}`);
    });

    this._client.on('networkTypeChanged', (evt) => {
      console.log(`----on-networkTypeChanged ${evt.networkType}`);
    });
    this._client.on('recordingDeviceChanged', (evt) => {
      console.log(`----on- recordingDeviceChanged ${evt.state} ${evt.device}`);
    });

    this._client.on('playoutDeviceChanged', (evt) => {
      console.log(`----on-playoutDeviceChanged ${evt.state} ${evt.device}`);
    });
    this._client.on('cameraChanged', (evt) => {
      console.log(`----on-cameraChanged ${evt.state} ${evt.device}`);
    });
    this._client.on('streamTypeChange', (evt) => {
      console.log(`----on- streamTypeChange  ${evt.state} ${evt.device}`);
    });


    this._client.init(agoraIoAppid,  () => {
      console.log('----AgoraRTC client initialized');
      this.is_initialized = true;
      this.is_initialized_subject$.next(true);

    }, (err) => {
      console.log('----AgoraRTC client init failed', err);
      this.is_initialized = false;
      this.is_initialized_subject$.next(false);

    });
  }

  get_initialized_done$(): Observable<boolean>{
    return this.is_initialized_observable$;
  }

  get localStreamId() {
    if (this._localStream) {
      return this._localStream.getId();
    }
    return null;
  }


  onStreamAdded(remoteStream) {

    // const remoteStreamId = remoteStream.getId();
    // this.remote_stream_added_id_arr.push(remoteStreamId);


    console.log('----onStreamAdded', remoteStream);

    const added_streams = this.remote_added_stream_arr_subject$.getValue();
    added_streams.push(remoteStream);
    this.remote_added_stream_arr_subject$.next(added_streams);



    // this._client.subscribe(remoteStream, (err) => {
    //   console.log('----Subscribe stream failed', err);
    // });
    // this.subscribeStream(remoteStream);
  }

  subscribe_added_stream(strem_id){
    const added_streams = this.remote_added_stream_arr_subject$.getValue();
    added_streams.forEach( (stream) => {
      const stream_id2 = stream.getId();
      if (stream_id2 === strem_id) {
        this.subscribeStream(stream);
      }
    });
  }

  subscribeStream(stream){
    this._client.subscribe(stream, (err) => {
      console.log('----Subscribe stream failed', err);
    });
  }


  unsubscribe_added_stream(strem_id){
    const added_streams = this.remote_added_stream_arr_subject$.getValue();
    added_streams.forEach( (stream) => {
      const stream_id2 = stream.getId();
      if (stream_id2 === strem_id) {
        this.unsubscribeStream(stream);
      }
    });
  }

  unsubscribeStream(stream){
    this._client.unsubscribe(stream, (err) => {
      console.log('----Subscribe stream failed', err);
    });
  }

  onStreamSubscribed(remoteStream) {

    const current_streams = this.remote_subscribed_stream_arr_subject$.getValue();
    current_streams.push(remoteStream);
    this.remote_subscribed_stream_arr_subject$.next(current_streams);




    // this._remote_stream_arr.push(remoteStream);

    // const remoteStreamId = remoteStream.getId();
    // const element_attribute = this.get_remote_stream_id(remoteStreamId);
    // this._remote_stream_subscribed_id_arr.push(element_attribute);

    // console.log('----Subscribe remote stream successfully: ' + element_attribute);
    // setTimeout(() => {
    //   remoteStream.play(element_attribute);
    // }, 100);

  }

  onStreamRemoved(remoteStream) {
    const removedStreamId = remoteStream.getId();
    console.log('--------onStreamRemoved', removedStreamId);
    this.removeStream(removedStreamId);

  }

  removeStream(removedStreamId){
    const current_subscribed_streams = this.remote_subscribed_stream_arr_subject$.getValue();
    let revmoved_subscriped_stream_index = -1;
    current_subscribed_streams.forEach( (stream: AgoraStream, index ) => {
      if (removedStreamId === stream.getId()) {
        revmoved_subscriped_stream_index = index;
      }
    });
    if (revmoved_subscriped_stream_index !== -1) {
      current_subscribed_streams.splice(revmoved_subscriped_stream_index, 1);
    }
    this.remote_subscribed_stream_arr_subject$.next(current_subscribed_streams);

    const current_added_streams = this.remote_added_stream_arr_subject$.getValue();
    let revmoved_added_stream_index = -1;
    current_added_streams.forEach( (stream: AgoraStream, index) => {
      const stream_id2 = stream.getId();
      if (stream_id2 === removedStreamId) {
        revmoved_added_stream_index = index;
      }
    });
    if (revmoved_added_stream_index !== -1) {
      current_added_streams.splice(revmoved_added_stream_index, 1);
    }
    this.remote_added_stream_arr_subject$.next(current_added_streams);
  }

  onUserLeave(uid) {
    this.removeStream(uid);
  }



  create_stream = (own_uid) => {

    let own_stream_id = '';
    if (own_uid) {
      own_stream_id = own_uid + '_s';
    } else {
      alert('no own uid');
    }

    // https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.streamspec.html

    console.log('----this.own_stream_id', own_stream_id);
    this._localStream = AgoraRTC.createStream({
      streamID: own_stream_id,
      audio: true,
      video: false,
      screen: false}
    );

    this._localStream.init(
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

  delete_stream() {

    if(this._localStream){
      this._localStream.stop();
      this._localStream = null;
    }
  }



  join_room(room_name: string, own_uid: string) {
    if (!room_name || !own_uid ) {
      alert('room name or uid is wrong');
    }
    if ( !this.is_initialized) {
      alert('agora is not yet initialized');
      return;
    }

    this._client.join( null, room_name, own_uid, (uid) => {
      console.log('--------User ' + uid + ' join channel successfully');
      this.is_room_joined = true;
      this.is_room_joined_subject$.next(true);

    }, (err) => {
      console.log('--------Join channel failed', err);
      this.is_room_joined_subject$.next(false);
      this.is_room_joined = false;
    });
  }

  get_is_room_joined(): Observable<boolean> {

    return this.is_room_joined_observable$;
  }



  leave_room() {
    if ( !this._client) {
      return;
    }
    this._client.leave(() => {
      this.is_room_joined = false;
      this.is_room_joined_subject$.next(false);

    },
    () => {
    });
  }




  publish_stream = () => {
    console.log('publish stream in service');
    if (!this._localStream) {
      return;
    }
    this._is_published = true;

    // this.localStream.play('agora_local');
    this._client.publish(this._localStream, (err) => {
      console.log('----Publish local stream error: ' + err);
      this._is_published = false;
    });

  }

  unpublish_stream = () => {
    if (!this._localStream) {
      return;
    }
    this._is_published = false;
    // this.localStream.play('agora_local');
    this._client.unpublish(this._localStream, (err) => {
      console.log('----Publish local stream error: ' + err);
    });
  }





  speaker_on() {
    this._remote_stream_arr.forEach( (remote_stream) => {
      remote_stream.setAudioVolume(100);
    });
    this.is_speaker_on = true;
  }

  speaker_off() {

    this._remote_stream_arr.forEach( (remote_stream) => {
      remote_stream.setAudioVolume(0);
    });
    this.is_speaker_on = false;
  }

  microphone_on() {
    if (!this._localStream) {
      return;
    }
    this._localStream.enableAudio();
    this._is_microphone_on = true;
  }


  microphone_off() {
    if (!this._localStream) {
      return;
    }
    this._localStream.disableAudio();
    this._is_microphone_on = false;
  }


  finalize() {
    this.leave_room();
    this.delete_stream();

  }



}
