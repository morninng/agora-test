import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserAuthService } from '../services/user-auth.service';

import { AgoraLibraryService } from 'agora-three';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private agoraLibraryService: AgoraLibraryService
  ) { }

  ngOnInit() {
    this.agoraLibraryService.enter_room('aaa');
  }

  goto_prep() {
    this.router.navigate(['/livevideo/prep/']);
  }

}
