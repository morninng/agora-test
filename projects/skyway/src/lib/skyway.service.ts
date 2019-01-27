import { Injectable } from '@angular/core';

import { Peer } from 'skyway-js';

@Injectable({
  providedIn: 'root'
})
export class SkywayService {


  peer = new Peer({
    key:   'aaaa',
    debug: 3
  });

  constructor() { }



}
