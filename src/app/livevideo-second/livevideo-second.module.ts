import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivevideoSecondRoutingModule } from './livevideo-second-routing.module';
import { SecondBeforeEnterLayoutComponent } from './second-before-enter-layout/second-before-enter-layout.component';

import { SkywayModule } from 'skyway';

@NgModule({
  imports: [
    CommonModule,
    LivevideoSecondRoutingModule
  ],
  declarations: [SecondBeforeEnterLayoutComponent]
})
export class LivevideoSecondModule { }
