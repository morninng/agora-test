import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondBeforeEnterLayoutComponent } from './second-before-enter-layout/second-before-enter-layout.component';

const routes: Routes = [
  {path: 'before-enter', component: SecondBeforeEnterLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivevideoSecondRoutingModule { }
