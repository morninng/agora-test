import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoraStreamPlayComponent } from './component/agora-stream-play/agora-stream-play.component';

import { AgoraLibraryService } from './services/agora-library.service';

@NgModule({
  declarations: [AgoraStreamPlayComponent],
  imports: [
    CommonModule
  ],
  exports: [AgoraStreamPlayComponent],
  providers: [ AgoraLibraryService ]
})
export class AgoraThreeModule { }
