import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AgoraIoService, AgoraStream } from '../agora-io.service';

@Component({
  selector: 'lib-added-stream',
  templateUrl: './added-stream.component.html',
  styleUrls: ['./added-stream.component.css']
})
export class AddedStreamComponent implements OnInit {

  added_stream_arr = [];
  added_stream_id_arr = [];


  constructor(
    private change_ref: ChangeDetectorRef,
    private agoraIoService: AgoraIoService
  ) { }

  ngOnInit() {

    this.agoraIoService.get_remote_added_stream$()
    .subscribe((added_stream_arr: AgoraStream[]) => {

      console.log('added_stream_arr', added_stream_arr);
      const added_stream_id_arr = [];

      added_stream_arr.forEach((added_stream: AgoraStream) => {
        const stream_id = added_stream.getId();
        added_stream_id_arr.push(stream_id);
      });
      this.added_stream_arr = added_stream_arr;
      this.added_stream_id_arr = added_stream_id_arr;
      this.change_ref.detectChanges();
    });

  }

  subscribe_stream(stream_id) {

    console.log('---- subscribe_stream', stream_id);

    this.agoraIoService.subscribe_added_stream(stream_id);

  }

  unsubscribe_stream(stream_id) {

    console.log('---- unsubscribe_stream', stream_id);

    this.agoraIoService.unsubscribe_added_stream(stream_id);
  }


}
