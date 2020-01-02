import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule, MatButtonModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule, MatListModule, MatInputModule, MatSelectModule } from '@angular/material'

@NgModule({
  imports:      [ MatCommonModule, BrowserModule, BrowserAnimationsModule, FormsModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatToolbarModule, MatListModule, MatInputModule, MatSelectModule,
  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmrR8vEUyuaK8PdteGu3XBTNJW26JOUY4'
    }) ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
