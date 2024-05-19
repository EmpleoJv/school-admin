import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("auth gaurd");

  if (authService.isAuthenticated()) {
    return true;
  }
   else {
    router.navigate(['/login']);
    return false;
  }
};
