import { Injectable } from '@angular/core';

import * as skywayPeer from 'skyway-js';


@Injectable({
  providedIn: 'root'
})
export class WebrtcSkywayService {

  constructor() { }

  test() {
    console.log('peer check');
    const peer = new skywayPeer({
      key:   'ae4c5882-2d66-472f-9d04-5859448eca41',
      debug: 3
    });

    peer.on('open', () => {});
    peer.on('error', (err) => {});

  }



}
