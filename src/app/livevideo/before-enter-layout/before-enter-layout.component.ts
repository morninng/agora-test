import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgoraIoService } from 'agora-io';
import { UserAuthService } from '../../services/user-auth.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-before-enter-layout',
  templateUrl: './before-enter-layout.component.html',
  styleUrls: ['./before-enter-layout.component.css']
})
export class BeforeEnterLayoutComponent implements OnInit {

  own_uid = '';

  constructor(
    private agoraIoService: AgoraIoService,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit() {
    this.own_uid = this.userAuthService.get_own_user_id();
  }


  enter_room() {
    this.agoraIoService.enter_webrtc_beforeenter(this.own_uid);
    this.agoraIoService.monitor_webrtc_enter$()
    .pipe(
      take(1)
    )
    .subscribe(() => {
      this.router.navigate(['/livevideo/game/']);
    });

  }

}
