import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceCallComponent } from './voice-call/voice-call.component';

import { AgoraIoModule } from 'agora-io';

@NgModule({
  declarations: [
    AppComponent,
    VoiceCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgoraIoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
