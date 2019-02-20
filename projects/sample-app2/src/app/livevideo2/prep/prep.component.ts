import { Component, OnInit } from '@angular/core';

import { AgoraLibService } from 'agora-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prep',
  templateUrl: './prep.component.html',
  styleUrls: ['./prep.component.css']
})
export class PrepComponent implements OnInit {

  audioEnabled$: Observable<boolean>;

  constructor(
    private agoraLibService: AgoraLibService
  ) { }

  ngOnInit() {
    this.agoraLibService.enter_room('prep');
    this.audioEnabled$ = this.agoraLibService.get_audio_enabled$();
  }

  toggleAudio() {
    this.agoraLibService.toggleAudio();
  }
}
