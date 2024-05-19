import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {
  users: any[] = [];
  LoggedinEmail: string = "";

  constructor(
        private secureStorageService: SecureStorageService,
        private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
       const roleToken = this.secureStorageService.getItem('role');
       if (!roleToken) {
           this.router.navigate(['/login']); 
           return false;`                                     `
       }
       
  const requiredRoles = route.data["role"] as string[];
  if (requiredRoles.includes(roleToken) || requiredRoles.includes('teacher') && roleToken === 'headTeacher') {
      return true;
  } else {
      switch(roleToken){
          case "teacher":
            this.router.navigate(['/teacher-leaderboard']);  
              break;
          case "headTeacher":
              this.router.navigate(['/head-leaderboard']);  
              break;
          case "student":
              this.router.navigate(['/profile']); 
              break;
          default:
              console.log("error in role");
      }
  }
  console.log("role gaurd");

  return false;
   }

  }
