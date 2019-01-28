import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivevideoSecondRoutingModule } from './livevideo-second-routing.module';
import { SecondBeforeEnterLayoutComponent } from './second-before-enter-layout/second-before-enter-layout.component';

import { WebrtcSkywayModule } from 'webrtc-skyway';
import { SecondGameComponent } from './second-game/second-game.component';

@NgModule({
  imports: [
    CommonModule,
    LivevideoSecondRoutingModule,
    WebrtcSkywayModule
  ],
  declarations: [SecondBeforeEnterLayoutComponent, SecondGameComponent]
})
export class LivevideoSecondModule { }
