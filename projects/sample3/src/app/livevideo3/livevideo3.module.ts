import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgoraThreeModule } from 'agora-three';

import { Livevideo3RoutingModule } from './livevideo3-routing.module';
import { BeforeEnterComponent } from './before-enter/before-enter.component';
import { GameComponent } from './game/game.component';
import { PrepComponent } from './prep/prep.component';
import { AllContainerComponent } from './all-container/all-container.component';

@NgModule({
  declarations: [BeforeEnterComponent, GameComponent, PrepComponent, AllContainerComponent],
  imports: [
    CommonModule,
    Livevideo3RoutingModule,
    AgoraThreeModule
  ]
})
export class Livevideo3Module { }
