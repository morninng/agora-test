import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoraLibComponent } from './component/agora-lib/agora-lib.component';

import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
const agoraConfig: AgoraConfig = {
  AppID: 'f5b81d3d190448c0a2b0db98186384ed',
};

import { AgoraLibService } from './services/agora-lib.service'

@NgModule({
  declarations: [AgoraLibComponent],
  imports: [
    CommonModule,
    AngularAgoraRtcModule.forRoot(agoraConfig)
  ],
  exports: [
    AgoraLibComponent
  ],
  providers: [AgoraLibService]
})
export class AgoraLibModule { }
