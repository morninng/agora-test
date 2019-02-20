import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-before-enter',
  templateUrl: './before-enter.component.html',
  styleUrls: ['./before-enter.component.css']
})
export class BeforeEnterComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  join() {
    this.router.navigate(['/livevideo/game/']);
  }

}
