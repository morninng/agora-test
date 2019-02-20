import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgoraLibService } from 'agora-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  audioEnabled$: Observable<boolean>;

  constructor(
    private agoraLibService: AgoraLibService,
    private router: Router
  ) { }

  ngOnInit() {
    this.agoraLibService.enter_room('aaa');
    this.audioEnabled$ = this.agoraLibService.get_audio_enabled$();
  }

  toggleAudio() {
    this.agoraLibService.toggleAudio();
  }

  goto_prep() {
    this.router.navigate(['/livevideo/prep/']);
  }


}
