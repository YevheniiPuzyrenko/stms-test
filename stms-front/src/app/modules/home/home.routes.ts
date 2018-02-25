import { Injectable } from '@angular/core';
import {
  Routes,
  Resolve,
  Router
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './components/home/home.component';
import {
  HomeService,
  IUser
} from './services/home.service';
import { LoginService } from '../login/services/login.service';

import { AuthGuard } from '../../auth.guard';


@Injectable()
export class UserResolver implements Resolve<IUser> {
  constructor(
    private service: HomeService,
    private loginService: LoginService,
    private router: Router
  ) {}

  resolve(): Observable<IUser> | Promise<IUser> | IUser | any {
    const username = this.loginService.getCredentials()['currentUser'];

    return this.service.getUser(username);
  }
}


export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [ AuthGuard ],
    resolve: {
      user: UserResolver
    }
  }
];
