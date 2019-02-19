import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Livevideo2RoutingModule } from './livevideo2-routing.module';
import { AllContainerComponent } from './all-container/all-container.component';
import { BeforeEnterComponent } from './before-enter/before-enter.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [AllContainerComponent, BeforeEnterComponent, GameComponent],
  imports: [
    CommonModule,
    Livevideo2RoutingModule
  ]
})
export class Livevideo2Module { }
