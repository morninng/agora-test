import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceCallComponent } from './voice-call/voice-call.component';


const routes: Routes = [
  { path: 'agora', component: VoiceCallComponent },
  {
    path: 'livevideo',
    loadChildren: './livevideo/livevideo.module#LivevideoModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
