import { NgModule } from '@angular/core';
import { AgoraBroadcastComponent } from './components/agora-broadcast.component';

import { AgoraBroadcastService } from './services/agora-broadcast.service';

@NgModule({
  declarations: [AgoraBroadcastComponent],
  imports: [
  ],
  exports: [AgoraBroadcastComponent],
  providers: [ AgoraBroadcastService ]
})
export class AgoraBroadcastModule { }
