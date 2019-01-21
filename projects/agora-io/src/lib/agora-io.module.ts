import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgoraIoComponent } from './agora-io.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [AgoraIoComponent],
  exports: [AgoraIoComponent]
})
export class AgoraIoModule { }
