import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticated = false;

  constructor() { }
  get userIsAuthenticated() {
    return this.userAuthenticated;
  }
  onLogin(){
    this.userAuthenticated = true;
  }
  logOut(){
    this.userAuthenticated = false;
  }
}
