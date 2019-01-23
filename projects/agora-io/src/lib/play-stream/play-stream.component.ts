import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AgoraIoService, AgoraStream } from '../agora-io.service';

@Component({
  selector: 'lib-play-stream',
  templateUrl: './play-stream.component.html',
  styleUrls: ['./play-stream.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayStreamComponent implements OnInit, OnDestroy {

  current_stream_id_arr: string[] = [];
  current_stream_arr: AgoraStream[] = [];

  constructor(
    private change_ref: ChangeDetectorRef,
    private agoraIoService: AgoraIoService
  ) { }

  ngOnInit() {
    this.agoraIoService.get_remote_subscribed_streams$()
    .subscribe((new_stream_arr: AgoraStream[] = []) => {

      console.log('new_stream_arr', new_stream_arr);
      const added_stream = [];
      const new_stream_id_arr = [];
      new_stream_arr.forEach((new_stream: AgoraStream) => {
        const new_stream_id = new_stream.getId();
        new_stream_id_arr.push(new_stream_id);
        if (this.current_stream_id_arr.indexOf(new_stream_id) === -1) {
          added_stream.push(new_stream);
        }
      });
      if (added_stream.length > 0) {
        this.play_stream_addd(added_stream);
      }

      const removed_stream = [];

      this.current_stream_arr.forEach((curr_stream: AgoraStream) => {
        let is_exist = false;
        const curr_stream_id = curr_stream.getId();
        new_stream_arr.forEach((new_stream: AgoraStream) => {
          const new_stream_id = new_stream.getId();
          if (new_stream_id === new_stream_id) {
            is_exist = true;
          }
        });
        if (!is_exist) {
          removed_stream.push(curr_stream);
        }
      });
      this.stop_play_stream(removed_stream);

      this.current_stream_arr = new_stream_arr;
      // const current_stream_id_arr = [];
      // this.current_stream_arr.forEach((stream: AgoraStream) => {
      //   current_stream_id_arr.push(stream.getId());
      // });
      this.current_stream_id_arr = new_stream_id_arr;
      this.change_ref.detectChanges();
    });
  }


  play_stream_addd(stream_arr: AgoraStream[]) {
    console.log('-------play_stream_addd', stream_arr)
    setTimeout(() => {
      stream_arr.forEach((stream: AgoraStream) => {
        stream.play(stream.getId());
      });
      this.change_ref.detectChanges();
    }, 200);
  }

  stop_play_stream(stream_arr: AgoraStream[]) {
    console.log('-------remove_stream', stream_arr)
    stream_arr.forEach((stream: AgoraStream) => {
      stream.stop();
      stream = null;
    });
  }

  ngOnDestroy() {
    // this.remove_stream(this.current_stream_arr);
  }

}