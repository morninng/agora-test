import { Injectable } from '@angular/core';

import { Observable, Subscription, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';


import { AngularAgoraRtcService, Stream  } from 'angular-agora-rtc';

export interface JoinRoomData {
  room_name: string;
  own_uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgoraLibService {

  localStream: Stream;
  own_userid = null;
  audioEnabled = true;
  audioEnabledSubject$ = new BehaviorSubject(this.audioEnabled);
  videoEnabled = true;
  room_name = '';

  enterRoomSubject$: Subject<JoinRoomData>;
  leaveRoomSubject$: Subject<void>;


  constructor(
    private agoraService: AngularAgoraRtcService
  ) {
    this.enterRoomSubject$ = new ReplaySubject(1);
    this.leaveRoomSubject$ = new ReplaySubject(1);
  }


  before_enter(own_userid) {
    this.own_userid = own_userid;
    this.agoraService.createClient('rtc');
    this.createLocalStream();
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


  createLocalStream() {

    this.localStream = this.agoraService.createStream(this.own_userid , true, null, null, true, false);
    this.localStream.on('accessAllowed', () => {
      console.log('localStream accessAllowed');
    });
    // The user has denied access to the camera and mic.
    this.localStream.on('accessDenied', () => {
      console.log('localStream accessDenied');
    });

    this.localStream.init(() => {
      console.log('getUserMedia successfully');
      // this.localStream.play('agora_local');

      this.agoraService.client.on('stream-published', function (evt) {
        console.log('Publish local stream successfully');
      });
    }, function (err) {
      console.log('getUserMedia failed', err);
    });
  }

  publishLocalStream() {
    if (!this.localStream) {
      return;
    }
    this.agoraService.client.publish(this.localStream,  (err) => {
      console.log('Publish local stream error: ' + err);
    });
  }

  unpublishStream = () => {
    if (!this.localStream) {
      return;
    }
    this.agoraService.client.unpublish(this.localStream, (err) => {
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
    this.agoraService.client.leave(
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
