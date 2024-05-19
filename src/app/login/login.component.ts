import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { AuthService } from './_Auth/auth.service';
import { Router } from '@angular/router';
import { SecureStorageService } from './_Auth/secure-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: any;
  password: any;
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private secureStorageService: SecureStorageService
  ) {}

  onSubmit() {
    this.loginService.getAllUserData().subscribe((res: any) => {
      const ds = res.data;

      const userEmail = ds.find((user: any) => user.email === this.email);
      if (userEmail) {
        const userPassword = ds.find(
          (user: any) => user.password === this.password
        );
        if (userPassword) {
          const userRole = ds.find(
            (user: any) =>
              user.email === this.email && user.password === this.password
          );
          const role = userRole.role;
          const randomToken = this.authService.generateRandomToken(10);

          this.authService.login(randomToken);

          this.secureStorageService.setItem('userId', userRole.id)

          switch (role) {
            case 'headTeacher':
              this.router.navigate(['/head-leaderboard']);
              this.secureStorageService.setItem('role', 'headTeacher');
              break;
            case 'teacher':
              this.router.navigate(['/teacher-leaderboard']);
              this.secureStorageService.setItem('role', 'teacher');
              break;
            case 'student':
              this.router.navigate(['/profile']);
              this.secureStorageService.setItem('role', 'student');
              break;
            default:
              console.log('error sa role');
          }
        } else {
          console.log('Wrong password');
        }
      } else {
        console.log('Wrong Email');
      }
    });
  }
}
