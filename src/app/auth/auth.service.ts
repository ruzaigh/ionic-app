import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticated = true;
  private userId = 'abc';
  constructor() { }

  get userIsAuthenticated() {
    return this.userAuthenticated;
  }
  get userID(){
    return this.userId;
  }
  onLogin(){
    this.userAuthenticated = true;
  }
  logOut(){
    this.userAuthenticated = false;
  }
}
