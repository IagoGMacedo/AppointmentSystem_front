import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { User } from '../types/userTypes';

export const rolePatientGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);

  const user : User | null = tokenService.getLoggedUser();
  console.log("entrei no patient role guard")
  console.log(user);
  if(user){
    if(user.profile === 'Patient'){
      return true;
    }
  }
  console.log("deu false");
  return false; 
};
