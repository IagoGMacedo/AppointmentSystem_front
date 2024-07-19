import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { User } from '../types/userTypes';

export const roleProfessionalGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);

  const user : User | null = tokenService.getLoggedUser();
  if(user){
    if(user.profile === 'Professional'){
      return true;
    }
  }
  return false; 
};
