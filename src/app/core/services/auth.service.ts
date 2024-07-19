import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { apiEndpoint } from '../constants/constants';
import { catchError, map, of, tap } from 'rxjs';
import { NotificationService } from './notification.service';
import { LoginResponse, RegisterResponse } from '../types/authTypes';
import { Login, Register } from '../types/formTypes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) {}

  onLogin(data: Login) {

    let params = new HttpParams()
      .set('login', data.login)
      .set('password', data.password);
    return this.http
      .get<LoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, {
        params: params,
      })
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  onRegister(data: Register) {
    return this.http
      .post<RegisterResponse>(`${apiEndpoint.AuthEndpoint.register}`, data)
      .pipe(
        tap((value) => {
          if (value) {
            this.notificationService.showSucess('Usuário criado com sucesso!');
          }
        })
      );
  }

  onLogout() {
    this.tokenService.removeToken();
  }
}
