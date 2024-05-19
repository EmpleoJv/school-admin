import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { SecureStorageService } from './secure-storage.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const secureStorageService = inject(SecureStorageService);
  const role = secureStorageService.getItem('role');
  if (authService.isAuthenticated()) {
    // router.navigate(['/teacher']);

    switch(role){
      case "teacher":
        router.navigate(['/teacher-leaderboard']);  
          break;
      case "headTeacher":
        router.navigate(['/head-leaderboard']);  
          break;
      case "student":
          router.navigate(['/profile']); 
          break;
      default:
          console.log("error in role");
  }
  console.log("login gaurd");
    return false;
  }
   else {
    return true;
  }
};
