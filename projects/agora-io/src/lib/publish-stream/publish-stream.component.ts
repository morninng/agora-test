import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AgoraIoService } from '../agora-io.service';

@Component({
  selector: 'lib-publish-stream',
  templateUrl: './publish-stream.component.html',
  styleUrls: ['./publish-stream.component.css']
})
export class PublishStreamComponent implements OnInit {

  get is_published(){
    return this.agoraIoService.get_is_published();
  }

  get is_microphone_on(){
    return this.agoraIoService.get_is_microphone_on();
  }
  
  constructor(
    private agoraIoService: AgoraIoService,
    private change_ref: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  publish() {
    console.log('--- publish');
    this.agoraIoService.publish_stream();
    this.change_ref.detectChanges();
  }

  unpublish() {
    this.agoraIoService.unpublish_stream();
    this.change_ref.detectChanges();
  }

  microphone_on() {
    this.agoraIoService.microphone_on();
  }

  microphone_off() {
    this.agoraIoService.microphone_off();
  }

}
