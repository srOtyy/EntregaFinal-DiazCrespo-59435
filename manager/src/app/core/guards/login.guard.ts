import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token')
 
  if(token){
    authService.checkToken(token)
    return true
  }else{
    router.navigate(['/auth']);
    return false;
  }
  
};
