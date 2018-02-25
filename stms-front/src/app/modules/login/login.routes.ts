import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }
];
