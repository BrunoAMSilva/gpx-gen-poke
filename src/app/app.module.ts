import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule, MatButtonModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule, MatListModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { DiscordCommandsComponent } from './discord-commands/discord-commands.component'

@NgModule({
  imports:      [ MatCommonModule, BrowserModule, BrowserAnimationsModule, FormsModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatToolbarModule, MatListModule, MatTabsModule, MatInputModule, MatSelectModule,
  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmrR8vEUyuaK8PdteGu3XBTNJW26JOUY4'
    }) ],
  declarations: [ AppComponent, HelloComponent, DiscordCommandsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
