import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './components/home/home.component';
import {
  HOME_ROUTES,
  UserResolver
} from './home.routes';
import { AuthGuard } from '../../auth.guard';
import {
  HomeService,
  AuthInterceptor
} from './services/home.service';


@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  exports: [ HomeComponent ],
  providers: [
    AuthGuard,
    UserResolver,
    HomeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class HomeModule {}
