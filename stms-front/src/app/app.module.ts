import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  Routes,
  Route,
  RouterModule
} from '@angular/router';

import { AppComponent } from './app.component';

import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
