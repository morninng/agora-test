import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AngularAgoraRtcService, Stream  } from 'angular-agora-rtc';
import { AgoraLibService, JoinRoomData } from '../../services/agora-lib.service';

@Component({
  selector: 'lib-agora-lib',
  templateUrl: './agora-lib.component.html',
  styleUrls: ['./agora-lib.component.css']
})
export class AgoraLibComponent implements OnInit, OnDestroy {

  remoteCalls: string[] = [];
  activeCall = false;
  all_subscribed_stream_arr: Stream[] = [];
  subscribe_ongoing = false;


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


    this.agoraLibService.monitor_leave_room$()
    .subscribe(() => {
      this.removeAllStream();
    });
  }

  joinRoom(room_name, own_uid) {
    console.log('room_name', room_name);
    console.log('own_uid', own_uid);
    this.agoraService.client.join(null, room_name, own_uid + room_name, (uid) => {
      this.activeCall = true;
      this.subscribeToStreams();
      this.agoraLibService.publishLocalStream();
    });
  }

 


  private subscribeToStreams() {

    if(this.subscribe_ongoing){
      return;
    }

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
        console.log('this.remoteCalls', this.remoteCalls);
        this.change_ref.detectChanges();
        setTimeout(
          () => {
            console.log('setTimeout');
            stream.play( stream_id );
          }, 200);
      }
      this.all_subscribed_stream_arr.push(stream);
    });

    this.agoraService.client.on('stream-removed', (evt) => {
      const stream = evt.stream;
      const uid = evt.uid;
      console.log('stream-removed', stream.getId());
      this.remove_stream(stream);
    });

    this.agoraService.client.on('peer-leave', (evt) => {
      const stream = evt.stream;
      const uid = evt.uid;
      console.log('peer-leave', stream.getId());
      console.log('peer-leave', uid)
      this.remove_stream(stream);

    });

    this.subscribe_ongoing = true;
  }

  removeAllStream(){
    this.all_subscribed_stream_arr.forEach((stream: Stream)=>{
      this.remove_stream(stream);
    })

  }

  remove_stream(stream: Stream) {
    const stream_id = stream.getId();
    console.log('remove stream', stream_id);
    if (stream) {
      stream.stop();

      this.remoteCalls = this.remoteCalls.filter(call => {
        return call !== stream_id;
      });
      console.log('this.remoteCalls', this.remoteCalls);
    }
  }

  ngOnDestroy() {
    this.agoraLibService.leave(() => {});
  }


}
