import { Injectable } from '@angular/core';

import { Observable, Subscription, Subject, ReplaySubject } from 'rxjs';


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

  enterRoomSubject$: Subject<JoinRoomData>;


  constructor(
    private agoraService: AngularAgoraRtcService
  ) {
    this.enterRoomSubject$ = new ReplaySubject(1);
  }

  // initialize(){
  //   this.agoraService.createClient();
  // }


  get_initialized(): Observable<boolean> {
    return;
  }


  before_enter(own_userid) {
    this.own_userid = own_userid;
    this.agoraService.createClient('rtc');
  }

  monitor_enter_room$(): Observable<JoinRoomData> {
    return this.enterRoomSubject$.asObservable();
  }


  enter_room(room_name) {
    this.enterRoomSubject$.next({room_name, own_uid: this.own_userid});
  }


  publishStream(){

    this.localStream = this.agoraService.createStream(this.own_userid, true, null, null, true, false);
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
      this.agoraService.client.publish(this.localStream, function (err) {
        console.log('Publish local stream error: ' + err);
      });
      this.agoraService.client.on('stream-published', function (evt) {
        console.log('Publish local stream successfully');
      });
    }, function (err) {
      console.log('getUserMedia failed', err);
    });


  }


}
