import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgoraLibModule } from 'agora-lib'

import { Livevideo2RoutingModule } from './livevideo2-routing.module';
import { AllContainerComponent } from './all-container/all-container.component';
import { BeforeEnterComponent } from './before-enter/before-enter.component';
import { GameComponent } from './game/game.component';
import { PrepComponent } from './prep/prep.component';

@NgModule({
  declarations: [AllContainerComponent, BeforeEnterComponent, GameComponent, PrepComponent],
  imports: [
    CommonModule,
    Livevideo2RoutingModule,
    AgoraLibModule
  ]
})
export class Livevideo2Module { }
