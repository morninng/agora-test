import { Component, OnInit } from '@angular/core';

import { WebrtcSkywayService } from 'webrtc-skyway';

@Component({
  selector: 'app-second-before-enter-layout',
  templateUrl: './second-before-enter-layout.component.html',
  styleUrls: ['./second-before-enter-layout.component.css']
})
export class SecondBeforeEnterLayoutComponent implements OnInit {

  constructor(
    private skywayService: WebrtcSkywayService
  ) { }

  ngOnInit() {
  }

  test() {

    this.skywayService.test();

  }

}
