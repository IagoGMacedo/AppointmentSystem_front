import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { LoadingService } from '../services/loading.service';
import { catchError, finalize, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

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
  const dialog = inject(MatDialog);

  loading.show();
  
  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
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
        const apiError: ApiError = value.body as ApiError;
        if (apiError.HttpStatus && apiError.HttpStatus !== 200) {
          throw apiError;
        }
      }
    }),
    //castando o erro pro meu tipo de erro
    catchError((error: ApiError) => {
      console.log('Error', error);
      
      if(error instanceof HttpErrorResponse){
        if(error.status == 401){
          tokenService.removeToken();
          dialog.closeAll();
          router.navigate(['']);
        }
      }
      
      // to do: transformar error para o tipo HttpErrorResponse
      if(error.HttpStatus == 401){

        tokenService.removeToken();
        router.navigate(['']);
      }


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
