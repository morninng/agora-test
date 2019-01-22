import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivevideoRoutingModule } from './livevideo-routing.module';
import { BeforeEnterLayoutComponent } from './before-enter-layout/before-enter-layout.component';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    CommonModule,
    LivevideoRoutingModule
  ],
  declarations: [BeforeEnterLayoutComponent, GameComponent]
})
export class LivevideoModule { }
