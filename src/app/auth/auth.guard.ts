import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router){}
  // CanLoad is a guard that runs before lazy code is fetch
  canLoad(
    route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //we check is user is authenticated or not to decide whether we can load the lazy code or not
    if(!this.authService.userIsAuthenticated) {
      this.router.navigateByUrl('/auth');
      }
    return this.authService.userIsAuthenticated;
    }
  }

