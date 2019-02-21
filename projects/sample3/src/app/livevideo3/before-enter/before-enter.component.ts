import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

import { AgoraLibraryService } from 'agora-three';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-before-enter',
  templateUrl: './before-enter.component.html',
  styleUrls: ['./before-enter.component.css']
})
export class BeforeEnterComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private agoraLibraryService: AgoraLibraryService
  ) { }

  ngOnInit() {
  }

  join() {
    const own_userid = this.userAuthService.get_ownid();
    this.agoraLibraryService.before_enter(own_userid);
    this.agoraLibraryService.before_enter_done$()
      .pipe(
        take(1)
      ).subscribe( () => {
        this.router.navigate(['/livevideo/game/']);
      });
  }

}
