import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = localStorage.getItem('role');
  if (authService.isAuthenticated()) {
    // router.navigate(['/teacher']);

  if(role === 'user'){
    router.navigate(['/profile']);
  }else if(role === 'admin'){
    router.navigate(['/teacher']);
  }else if(role === 'superAdmin'){
    router.navigate(['/leaderboard']);
  }else{
    console.log("gg toh par");

  }
    return false;
  }
   else {
    return true;
  }
};
