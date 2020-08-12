import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrussEditorModule } from 'projects/truss-editor/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrussEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
