import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import AgoraRTC from 'agora-rtc-sdk';

const REMOT_STREAM_PREFIX = 'REMOT_STREAM_PREFIX';

type AgoraClientCodec = 'vp8' | 'h264';
type AgoraClientMode = 'live' | 'rtc';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css']
})
export class VoiceCallComponent implements OnInit, OnDestroy {


  REMOT_STREAM_PREFIX = REMOT_STREAM_PREFIX;

  client = null;
  own_uid = null;
  own_stream_id = null;
  localStream = null;
  remote_stream_subscribed_id_arr = [];
  remote_stream_added_id_arr = [];
  remote_stream_arr = [];
  is_joined = false;
  is_published = false;
  localStream_id = null;

  is_speaker_on = true;
  is_microphone_on = true;

  constructor(private change_ref: ChangeDetectorRef) { }

  ngOnInit() {

    // https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.clientconfig.html

    const codec: AgoraClientCodec = 'h264';
    const mode: AgoraClientMode = 'rtc';

    this.client = AgoraRTC.createClient({mode, codec});

    this.client.on('stream-published', (evt) => {
      console.log('----stream-published');

      this.client.getLocalAudioStats((stats) => {
        console.log('----getLocalAudioStats', stats);
      });
    });

    this.client.on('stream-added', (evt) => {
      const stream = evt.stream;
      console.log('----stream-added: ' + stream.getId());
      this.onStreamAdded(stream);

    });
    this.client.on('stream-removed', (evt) => {
      const stream = evt.stream;
      console.log(`-----stream-removed ${stream.getId()}`);
    });

    this.client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      console.log(`-----stream-subscribed  ${stream.getId()}`);
      this.onStreamSubscribed(stream);
    });

    this.client.on('peer-leave', (evt) => {
      const uid = evt.uid;
      console.log(`-----peer-leave ${uid}`);
    });

    this.client.on('mute-audio', (evt) => {
      const uid = evt.uid;
      console.log(`-----'mute-audio ${uid}`);
    });

    this.client.on('unmute-audio', (evt) => {
      const uid = evt.uid;
      console.log(`-----'unmute-audio ${uid}`);
    });

    this.client.on('mute-video', (evt) => {
      const uid = evt.uid;
      console.log(`-----mute-video${uid}`);
    });
    this.client.on('unmute-video', (evt) => {
      const uid = evt.uid;
      console.log(`-----unmute-video${uid}`);
    });

    this.client.on('client-banned', (evt) => {
      const uid = evt.uid;
      const attr = evt.attr;
      console.log(`-----client-banned ${uid} ${attr}`);
    });
    this.client.on('active-speaker', (evt) => {
      const uid = evt.uid;
      console.log(`-----active-speaker ${uid}`);
    });
    this.client.on('volume-indicator', (evt) => {
      evt.attr.forEach( (volume, index) => {
        console.log(`-----#{index} UID ${volume.uid} Level ${volume.level}`);
      });
    });
    this.client.on('liveStreamingStarted', (evt) => {
      console.log(`-----liveStreamingStarted`);
    });

    this.client.on('liveStreamingFailed', (evt) => {
      console.log(`-----liveStreamingFailed`);
    });
    this.client.on('liveStreamingStopped', (evt) => {
      console.log(`-----liveStreamingStopped`);
    });

    this.client.on('liveTranscodingUpdated', (evt) => {
      console.log(`-----liveTranscodingUpdated`);
    });
    this.client.on('onTokenPrivilegeWillExpire', (evt) => {
      console.log(`-----onTokenPrivilegeWillExpire`);
    });
    this.client.on('onTokenPrivilegeDidExpire', (evt) => {
      console.log(`-----onTokenPrivilegeDidExpire`);
    });
    this.client.on('error', (err) => {
      console.log(`-----error ${ err.reason}`);
    });

    this.client.on('networkTypeChanged', (evt) => {
      console.log(`-----networkTypeChanged ${evt.networkType}`);
    });
    this.client.on('recordingDeviceChanged', (evt) => {
      console.log(`----- recordingDeviceChanged ${evt.state} ${evt.device}`);
    });

    this.client.on('playoutDeviceChanged', (evt) => {
      console.log(`-----playoutDeviceChanged ${evt.state} ${evt.device}`);
    });
    this.client.on('cameraChanged', (evt) => {
      console.log(`-----cameraChanged ${evt.state} ${evt.device}`);
    });
    this.client.on('streamTypeChange', (evt) => {
      console.log(`----- streamTypeChange  ${evt.state} ${evt.device}`);
    });


    this.client.init('f5b81d3d190448c0a2b0db98186384ed',  () => {
      console.log('----AgoraRTC client initialized');

    }, function (err) {
      console.log('----AgoraRTC client init failed', err);
    });
  }

  onStreamAdded(remoteStream) {

    const remoteStreamId = remoteStream.getId();
    this.remote_stream_added_id_arr.push(remoteStreamId);
    this.change_ref.detectChanges();
    console.log('----onStreamAdded');

    this.client.subscribe(remoteStream, (err) => {
      console.log('----Subscribe stream failed', err);
    });
  }

  onStreamSubscribed(remoteStream) {


    this.remote_stream_arr.push(remoteStream);

    const remoteStreamId = remoteStream.getId();
    const element_attribute = this.get_remote_stream_id(remoteStreamId);
    this.remote_stream_subscribed_id_arr.push(element_attribute);

    this.change_ref.detectChanges();

    console.log('----Subscribe remote stream successfully: ' + element_attribute);
    setTimeout(() => {
      remoteStream.play(element_attribute);
    }, 100);

  }

  onStreamRemoved(remoteStream) {
    console.log('--------onStreamRemoved');
    const remoteStreamId = remoteStream.getId();
    remoteStream.stop();
  }


  get_remote_stream_id(remoteStreamId: string): string {

    return `${REMOT_STREAM_PREFIX}-${remoteStreamId}`;
  }


  join_room_a = () => {

    const date_now = String(Date.now());
    this.own_uid = date_now.substr(-8);
    // const own_uid = 'sss';
    console.log(`-----%c own_uid ${this.own_uid}`, 'color:red');

    this.client.join( null, 'room-a', this.own_uid, (uid) => {
      console.log('--------User ' + uid + ' join channel successfully');
      this.is_joined = true;
    }, (err) => {
      console.log('--------Join channel failed', err);
      this.is_joined = false;
    });
    this.change_ref.detectChanges();
  }


  leave_channel() {
    this.client.leave(() => {
      this.is_joined = false;
      this.change_ref.detectChanges();
    },
    () => {
      this.is_joined = true;
      this.change_ref.detectChanges();
    });
  }


  create_stream = () => {

    if (this.own_uid) {
      this.own_stream_id = this.own_uid + '_s';
    } else {
      alert('no own uid');
    }

    // https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.streamspec.html

    console.log('----this.own_stream_id', this.own_stream_id);
    this.localStream = AgoraRTC.createStream({
      streamID: this.own_stream_id,
      audio: true,
      video: false,
      screen: false}
    );

    this.localStream.init(
      () => {
        console.log('----getUserMedia successfully');
        this.localStream_id = this.localStream.getId();
        this.change_ref.detectChanges();
      },
      (err) => {
        console.log('----getUserMedia failed', err);
      }
    );
  }

  get localStreamId() {
    if(this.localStream){
      return this.localStream.getId();
    }
    return null;
  }


  publish_stream = () => {
    if (!this.localStream) {
      return;
    }
    this.is_published = true;

    // this.localStream.play('agora_local');
    this.client.publish(this.localStream, (err) => {
      console.log('----Publish local stream error: ' + err);
      this.is_published = false;
      this.change_ref.detectChanges();
    });

  }

  unpublish_stream = () => {
    if (!this.localStream) {
      return;
    }
    this.is_published = false;
    this.change_ref.detectChanges();
    // this.localStream.play('agora_local');
    this.client.unpublish(this.localStream, (err) => {
      console.log('----Publish local stream error: ' + err);
      this.change_ref.detectChanges();
    });
  }






  speaker_on() {
    this.remote_stream_arr.forEach( (remote_stream) => {
      remote_stream.setAudioVolume(100);
    });
    this.is_speaker_on = true;
    this.change_ref.detectChanges();
  }

  speaker_off() {

    this.remote_stream_arr.forEach( (remote_stream) => {
      remote_stream.setAudioVolume(0);
    });
    this.is_speaker_on = false;
    this.change_ref.detectChanges();
  }

  microphone_on() {
    if (!this.localStream) {
      return;
    }
    this.localStream.enableAudio();
    this.is_microphone_on = true;
    this.change_ref.detectChanges();
  }


  microphone_off() {
    if (!this.localStream) {
      return;
    }
    this.localStream.disableAudio();
    this.is_microphone_on = false;
    this.change_ref.detectChanges();
  }


  finalize() {
    if (this.localStream ) {
      this.localStream.close();
    }
  }


  ngOnDestroy() {
    this.finalize();
  }

}
