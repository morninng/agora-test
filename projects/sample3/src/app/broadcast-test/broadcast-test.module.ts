import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BroadcastTestRoutingModule } from './broadcast-test-routing.module';


import { AgoraBroadcastModule } from 'agora-broadcast';

import { AllContainerComponent } from './all-container/all-container.component';
import { BeforeEnterComponent } from './before-enter/before-enter.component';
import { GameComponent } from './game/game.component';
import { PrepComponent } from './prep/prep.component';

@NgModule({
  declarations: [AllContainerComponent, BeforeEnterComponent, GameComponent, PrepComponent],
  imports: [
    CommonModule,
    BroadcastTestRoutingModule,
    AgoraBroadcastModule,
  ]
})
export class BroadcastTestModule { }
