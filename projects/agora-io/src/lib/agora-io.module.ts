import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoraIoComponent } from './agora-io.component';
import { PublishStreamComponent } from './publish-stream/publish-stream.component';
import { PlayStreamComponent } from './play-stream/play-stream.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AgoraIoComponent, PublishStreamComponent, PlayStreamComponent],
  exports: [AgoraIoComponent, PublishStreamComponent, PlayStreamComponent]
})
export class AgoraIoModule { }
