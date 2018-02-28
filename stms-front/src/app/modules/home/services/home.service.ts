import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { LoginService } from '../../login/services/login.service';

export interface ICoord {
  x: number;
  y: number;
}

export interface IUser {
  username: string;
  password: string;
  imageUrl: string;
  nameCoords: ICoord;
  imageCoords: ICoord;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = this.loginService.getCredentials();
    const token = credentials['token'] || '';

    const authenticatedRequest = req.clone({
      setHeaders: {
        'Authorization': token
      }
    });

    return next.handle(authenticatedRequest).catch((err: HttpErrorResponse) => {
      if (!(err.error instanceof Error) && err.status === 401) {
        this.router.navigate(['login']);
      }
      return Observable.throw(err);
    });
  }
}

@Injectable()
export class HomeService {
  constructor( private http: HttpClient ) {}

  getUser(username) {
    return this.http.get(`/api/user/${username}`);
  }

  saveCoords(username: string, coords: object) {
    const body = {
      imageCoords: coords['image'],
      nameCoords: coords['name']
    };

    return this.http.put(`/api/user/${username}/coords`, body).subscribe();
  }
}
