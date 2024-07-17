import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { LoadingService } from '../services/loading.service';
import { catchError, finalize, tap } from 'rxjs';

type ApiError = {
  Data: null;
  HttpStatus: number;
  Messages: string[];
};

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const loading = inject(LoadingService);

  loading.show();
  
  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        console.log("coloquei bearer");
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenService.getToken()}`,
          },
        });
      }
    },
  });

  return next(req).pipe(
    tap((value) => {
      //notificationService.hideError();
      if (value instanceof HttpResponse) {
        console.log('instanceof HttpResponse');
        const apiError: ApiError = value.body as ApiError;
        if (apiError.HttpStatus && apiError.HttpStatus !== 200) {
          throw apiError;
        }
      }
    }),
    //castando o erro pro meu tipo de erro
    catchError((error: ApiError) => {
      console.log('Error', error);
      

      // to do: quitar o usuario fora da aplicação se vier um 401


      notificationService.showError(
        error?.Messages
          ? error.Messages[0]
          : 'Ocorreu um erro, entre em contato com o administrador'
      );
      throw {
        status: error.HttpStatus,
        message: error?.Messages
          ? error.Messages[0]
          : 'Ocorreu um erro, entre em contato com o administrador',
      };
    }),
    finalize(() => loading.hide())
  );
};
