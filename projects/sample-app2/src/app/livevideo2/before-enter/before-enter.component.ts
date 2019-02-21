import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgoraLibService } from 'agora-lib';

import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-before-enter',
  templateUrl: './before-enter.component.html',
  styleUrls: ['./before-enter.component.css']
})
export class BeforeEnterComponent implements OnInit {

  constructor(
    private router: Router,
    private agoraLibService: AgoraLibService,
    private userAuthService: UserAuthService
    ) { }


    
  ngOnInit() {
    const own_userid = this.userAuthService.get_ownid();
    this.agoraLibService.before_enter(own_userid);
  }

  join() {
    this.router.navigate(['/livevideo/game/']);
  }

}
