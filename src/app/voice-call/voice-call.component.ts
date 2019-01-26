import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';


// import AgoraRTC from 'agora-rtc-sdk';

import { AgoraIoService } from 'agora-io';

import { UserAuthService } from '../services/user-auth.service';



@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css']
})
export class VoiceCallComponent implements OnInit, OnDestroy {

  is_webrtc_initialized = false;
  own_uid;
  is_room_joined = false;

  constructor(
    private change_ref: ChangeDetectorRef,
    private agoraIoService: AgoraIoService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit() {
    // console.log(AgoraRTC);
    this.own_uid = this.userAuthService.get_own_user_id();
  }

  start_initialize() {

    this.agoraIoService.initialize_webrtc();
    return this.agoraIoService.get_initialized_done$()
      .subscribe((initialized: boolean) => {
        this.is_webrtc_initialized = initialized;
        this.change_ref.detectChanges();
      });
  }

  join_room_a = () => {

    const own_uid = this.userAuthService.get_own_user_id();

    this.agoraIoService.join_room('aaa', own_uid);
    this.agoraIoService.get_is_room_joined()
      .subscribe( (is_room_joined: boolean) => {
        this.is_room_joined = is_room_joined;
        this.change_ref.detectChanges();
      });
    this.change_ref.detectChanges();
  }

  leave_room() {
    this.agoraIoService.leave_room();
  }

  create_stream = () => {

    const own_uid = this.userAuthService.get_own_user_id();
    this.agoraIoService.create_stream(own_uid);
  }

  delete_stream = () => {
    this.agoraIoService.delete_stream();
  }


  get localStreamId() {
    return this.agoraIoService.localStreamId;
  }

  publish_stream = () => {
    const own_uid = this.userAuthService.get_own_user_id();
    this.agoraIoService.publish_stream(own_uid);
  }
  unpublish_stream = () => {
    this.agoraIoService.unpublish_stream();
  }

  speaker_on() {
    this.agoraIoService.speaker_on();
  }
  speaker_off() {
    this.agoraIoService.speaker_off();
  }

  microphone_on() {
    this.agoraIoService.microphone_on();
  }

  microphone_off() {
    this.agoraIoService.microphone_off();
  }

  ngOnDestroy() {
  }

}
