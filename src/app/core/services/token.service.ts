import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants/constants';
import { User } from '../types/userTypes';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(constants.CURRENT_TOKEN);
  }

  removeToken() {
    this.updateToken(false);
    localStorage.removeItem(constants.CURRENT_TOKEN);
  }

  getLoggedUser(): User | null {
    let token: string | null = localStorage.getItem(constants.CURRENT_TOKEN);
    if (token) {
      let jsonContent = JSON.parse(atob(token.split('.')[1]));
      //return jsonContent as IUser; assim seria o melhor jeito?
      return {
        id: jsonContent[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
        ],
        name: jsonContent[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ],
        profile:
          jsonContent[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
        login: jsonContent.login,
      };
    }
    return null;
  }
  
}
