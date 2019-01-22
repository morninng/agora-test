import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AgoraIoService } from 'agora-io';
import { UserAuthService } from '../../services/user-auth.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  is_room_joined = false;
  own_uid = null;

  constructor(
    private change_ref: ChangeDetectorRef,
    private agoraIoService: AgoraIoService,
    private userAuthService: UserAuthService,
  ) { }

  ngOnInit() {

    this.own_uid = this.userAuthService.get_own_user_id();

    this.agoraIoService.join_room('aaa', this.own_uid);
    this.agoraIoService.get_is_room_joined()
      .subscribe( (is_room_joined: boolean) => {
        this.is_room_joined = is_room_joined;
        this.change_ref.detectChanges();
      });
    this.change_ref.detectChanges();



  }

}
