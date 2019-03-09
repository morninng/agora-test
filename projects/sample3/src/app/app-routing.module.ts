import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'livevideo',
    loadChildren: './livevideo3/livevideo3.module#Livevideo3Module',
  },
  {
    path: 'broadcast',
    loadChildren: './broadcast-test/broadcast-test.module#BroadcastTestModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
