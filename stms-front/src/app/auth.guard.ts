import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard {
  
  constructor( private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot ): boolean {
    const tokenExists: boolean = !!window.localStorage.getItem('authToken');

    if (!tokenExists) {
      this.router.navigate(['login']);
    };
    
    return tokenExists;
  }
  
}