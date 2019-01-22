import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoraIoComponent } from './agora-io.component';
import { PublishStreamComponent } from './publish-stream/publish-stream.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AgoraIoComponent, PublishStreamComponent],
  exports: [AgoraIoComponent, PublishStreamComponent]
})
export class AgoraIoModule { }
