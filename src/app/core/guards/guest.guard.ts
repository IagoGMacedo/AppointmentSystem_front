import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { User } from '../types/userTypes';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);


  tokenService.isAuthentication$.subscribe((val) => {
    if(val){
      
       tokenService.loggedUser$.subscribe((user) => {
        if(user){
          if(user.profile === 'Patient'){
            router.navigate(['patient']);
  
          }else if(user.profile === "Professional"){
          router.navigate(['professional']);
          }
        }
       })
    }
  })

  

  return true;
};
