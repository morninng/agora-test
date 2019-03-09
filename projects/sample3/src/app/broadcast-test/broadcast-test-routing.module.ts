import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AllContainerComponent } from './all-container/all-container.component';
import { BeforeEnterComponent } from './before-enter/before-enter.component';
import { GameComponent } from './game/game.component';
import { PrepComponent } from './prep/prep.component';


const routes: Routes = [
  {
    path: '',
    component: AllContainerComponent,
    children: [
      {
        path: 'before-enter',
        component: BeforeEnterComponent,
      },
      {
        path: 'game',
        component: GameComponent,
      },
      {
        path: 'prep',
        component: PrepComponent,
      }
    ]
  }
];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastTestRoutingModule { }
