import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChuckNorrisComponent } from './chuck-norris/chuck-norris.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ChuckNorrisComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
