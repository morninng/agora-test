import { Component, OnInit } from '@angular/core';

import { AgoraLibService } from 'agora-lib';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private agoraLibService: AgoraLibService
  ) { }

  ngOnInit() {
    this.agoraLibService.enter_room('aaa');
  }

}
