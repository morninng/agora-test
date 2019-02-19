import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AngularAgoraRtcService, Stream  } from 'angular-agora-rtc';
import { AgoraLibService, JoinRoomData } from '../../services/agora-lib.service';

@Component({
  selector: 'lib-agora-lib',
  templateUrl: './agora-lib.component.html',
  styleUrls: ['./agora-lib.component.css']
})
export class AgoraLibComponent implements OnInit {

  remoteCalls: string[] = [];

  constructor(
    private agoraService: AngularAgoraRtcService,
    private agoraLibService: AgoraLibService,
    private change_ref: ChangeDetectorRef
  ) {
   }

  ngOnInit() {
    this.agoraLibService.monitor_enter_room$()
    .subscribe((room_data: JoinRoomData) => {
      console.log('join room', room_data.room_name);
      this.joinRoom(room_data.room_name, room_data.own_uid);
    });
  }

  joinRoom(room_name, own_uid) {
    console.log('room_name', room_name);
    console.log('own_uid', own_uid);
    this.agoraService.client.join(null, room_name, own_uid, (uid) => {
      this.subscribeToStreams();
      this.agoraLibService.publishStream();
    });
  }

 


  private subscribeToStreams() {
    console.log('subscribeToStreams');

    this.agoraService.client.on('error', (err) => {
      console.log('Got error msg:', err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey('', () => {
          console.log('Renew channel key successfully');
        },
        ( err ) => {
          console.log('Renew channel key failed: ', err);
        });
      }
    });

    this.agoraService.client.on('stream-added', (evt) => {
      console.log('stream-added')
      const stream = evt.stream;
      this.agoraService.client.subscribe(stream, (err) => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.agoraService.client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      const stream_id = stream.getId();
      console.log('stream-subscribed', stream_id);
      if (!this.remoteCalls.includes(stream_id)) {
        console.log(`agora_remote${stream_id}`);
        this.remoteCalls.push(stream_id);
        this.change_ref.detectChanges();

        setTimeout(
          () => {
            console.log('setTimeout');
            stream.play( stream_id );
          }, 200);

      }

    });

    this.agoraService.client.on('stream-removed', (evt) => {
      console.log('stream-removed')
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    this.agoraService.client.on('peer-leave', (evt) => {
      console.log('peer-leave');
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }




}
