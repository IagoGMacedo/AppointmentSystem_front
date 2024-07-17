import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { User } from '../types/userTypes';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        const user : User | null = tokenService.getLoggedUser();
        if(user){
          if(user.profile === "Patient"){
            router.navigate(['patient']);
          } else if(user.profile === "Professional"){
            router.navigate(['professional']);
          }
        }
      }
    },
  });

  return true;
};
