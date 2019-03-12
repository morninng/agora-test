import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import AgoraRTC from 'agora-rtc-sdk'

import { UserAuthService } from '../../services/user-auth.service';

const agoraIoAppid = 'f5b81d3d190448c0a2b0db98186384ed';


@Component({
  selector: 'lib-agora-broadcast-stream-play',
  templateUrl: './agora-broadcast-stream-play.component.html',
  styleUrls: ['./agora-broadcast-stream-play.component.css']
})
export class AgoraBroadcastStreamPlayComponent implements OnInit {

  client: any;
  localStream: any;
  stream_id_arr: string[] = [];

  constructor(
    private userAuthService: UserAuthService,
    private change_ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  initialize() {

    this.client = AgoraRTC.createClient({mode: 'live'});
    this.client.init(agoraIoAppid,
      () => {
      console.log(`AgoraRTC client initialized`);
      },
    (err) => {
      console.log(`AgoraRTC client init failed`, err);
      }
    );

    this.client.on('peer-leave',  (evt) => {
      const stream = evt.stream;
      console.log(`peer-leave: `);

    });



    this.client.on('stream-added',  (evt) => {
      const stream = evt.stream;
      console.log(`New stream added: `);
      this.client.subscribe(stream,  (err) => {
        console.log(`Subscribe stream failed`, err);
      });
    });

    this.client.on('stream-published', function (evt) {
      console.log(`Publish local stream successfully`);
    });


    this.client.on('stream-subscribed',  (evt) => {
      const remoteStream = evt.stream;
      console.log(`Subscribe remote stream successfully: `);
      const stream_id = remoteStream.getId();
      this.stream_id_arr.push(stream_id);
      setTimeout(() => {
        remoteStream.play(stream_id);
      }, 300);

      this.change_ref.detectChanges();


    });

    this.client.on(`client-role-changed`, function(evt) {
      console.log(`!!!!!!!!!!!!!!!!!!!!client-role-changed`, evt.role);
    });



  }



  join() {

    const own_uid = this.userAuthService.get_own_userid();
    this.client.join( null, 'room-name', own_uid, (uid) => {
      console.log(`User ` + uid + ` join channel successfully`);
    }, (err) => {
      console.log(`Join channel failed`, err);
    });
  }

  create_stream() {

    const own_uid = this.userAuthService.get_own_userid();

    this.localStream = AgoraRTC.createStream({
      streamID: own_uid,
      audio: true,
      video: true,
      screen: false}
    );
    this.localStream.init(() => {
      console.log(`getUserMedia successfully`);
      this.localStream.play('local_video');
    }, (err) => {
      console.log(`getUserMedia failed`, err);
    });
  }



  publish() {
    this.client.publish(this.localStream, function (err) {
      console.log(`Publish local stream error: ` + err);
    });

  }

  unpublish() {
    this.client.unpublish(this.localStream, function (err) {
      console.log(`unpublish local stream error: ` + err);
    });

  }




  become_host() {

    this.client.setClientRole(`host`, () => {
      console.log(`setHost success`);
    }, (e) => {
      console.log(`setHost failed`, e);
    });

  }

  become_audience() {

    this.client.setClientRole(`audience`, () => {
      console.log(`set audience success`);
    }, (e) => {
      console.log(`set audience failed`, e);
    });

  }

}
