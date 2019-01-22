import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoraIoComponent } from './agora-io.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AgoraIoComponent],
  exports: [AgoraIoComponent]
})
export class AgoraIoModule { }
