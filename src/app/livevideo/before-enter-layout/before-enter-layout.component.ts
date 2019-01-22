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

  constructor(
    private agoraIoService: AgoraIoService,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit() {
  }


  enter_room() {
    const own_uid = this.userAuthService.get_own_user_id();
    this.agoraIoService.enter_webrtc_beforeenter(own_uid);
    this.agoraIoService.monitor_webrtc_enter$()
    .pipe(
      take(1)
    )
    .subscribe(() => {
      this.router.navigate(['/livevideo/game/']);
    });

  }

}
