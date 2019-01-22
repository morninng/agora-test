import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeforeEnterLayoutComponent } from './before-enter-layout/before-enter-layout.component';
import { GameComponent } from './game/game.component';

import { BeforeenterBeforeGameGuard } from './guard/beforeenter-before-game.guard';

const routes: Routes = [
  {
    path: 'before-enter',
    component: BeforeEnterLayoutComponent
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [BeforeenterBeforeGameGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivevideoRoutingModule { }
