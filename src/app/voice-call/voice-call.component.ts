import { Component, OnInit } from '@angular/core';

import AgoraRTC from 'agora-rtc-sdk';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css']
})
export class VoiceCallComponent implements OnInit {


  client = null;

  constructor() { }

  ngOnInit() {


    this.client = AgoraRTC.createClient({mode: 'live', codec: 'h264'});

    this.client.init('f5b81d3d190448c0a2b0db98186384ed',  () => {
      console.log('goraRTC client initialized');

    }, function (err) {
      console.log('AgoraRTC client init failed', err);
    });
  }

  join_room_a() {

    const own_uid = String(Date.now());
    const shortened_uid = own_uid.substr(-8);
    // const own_uid = 'sss';
    console.log(`%c own_uid ${own_uid}`, 'color:red');

    this.client.join( null, 'room-a', own_uid, (uid) => {
      console.log('User ' + uid + ' join channel successfully');
    }, (err) => {
      console.log('Join channel failed', err);
    });

  }





}
