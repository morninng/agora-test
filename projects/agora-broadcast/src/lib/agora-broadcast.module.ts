import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AngularAgoraRtcModule } from 'angular-agora-rtc';

import { AgoraBroadcastService } from './services/agora-broadcast.service';
import { AgoraBroadcastStreamPlayComponent } from './components/agora-broadcast-stream-play/agora-broadcast-stream-play.component';

@NgModule({
  declarations: [AgoraBroadcastStreamPlayComponent],
  imports: [
    AngularAgoraRtcModule, CommonModule,
  ],
  exports: [ AgoraBroadcastStreamPlayComponent ],
  providers: [ AgoraBroadcastService ]
})

export class AgoraBroadcastModule { }
