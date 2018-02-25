import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  private currentUser: string;

  constructor( private http: HttpClient ) {}

  setCredentials(username: string, token: string): void {
    window.localStorage.setItem('currentUser', username);
    window.localStorage.setItem('authToken', token);
  }

  getCredentials(): object {
    return {
      currentUser: window.localStorage.getItem('currentUser'),
      token: window.localStorage.getItem('authToken')
    };
  }

  login(credentials: object): Observable<object> {
    return this.http.post('/api/login', credentials);
  }
}
