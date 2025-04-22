import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";
const TOKEN=  's_token';
const USER='s_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);

  }
  static getToken():string {
    return localStorage.getItem(TOKEN);
  }
  getToken():string {
    return localStorage.getItem(TOKEN);
  }
  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));

  }

  static getUser():string {
    return JSON.parse(localStorage.getItem(USER));
  }
 /* CurrentUser(): User {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } else {
      return null;
    }
  }
  }*/
  static getUserId(): string {
    const user = JSON.parse(this.getUser());
    if (user == null) { return; }
    return user.id;
  }
  static getUserRole(): string {
    const user = JSON.parse(this.getUser());
    if (user == null) { return ''; }
    return user.role;
  }
  static isStudentLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }

    const role: string = this.getUserRole();
    return role == 'Student';
  }
  static isEXPOSANTLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'EXPOSANT';
  }
  static isADMINITRATORLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMINITRATOR';
  }
  static isALUMNILoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ALUMNI';
  }
  static isPROFESSORLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'PROFESSOR';
  }
  static isSupplierLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == ' Supplier';
  }
  static isFINANCIALLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == ' FINANCIAL';
  }
  static signOut(): void {
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
  }
  getUser() {
    // Get the user from local storage and return it
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }







}
