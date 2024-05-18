import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { AuthService } from './_Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
email: any;
password: any;
    constructor(private loginService: LoginService,
                private authService: AuthService,
                private router: Router
    ){}

   onSubmit() {
      this.loginService.getAllUserData().subscribe((res:any) =>{
        const ds = res.data;

        const userEmail = ds.find((user: any) => user.email === this.email);
        if(userEmail){
          const userPassword = ds.find((user: any) => user.password === this.password);
          if(userPassword){

                  const role = userPassword.role;
                  const randomToken = this.authService.generateRandomToken(10);

                 
                  this.authService.login(randomToken);
                  
                  switch (role) {
                    case "superAdmin":
                        this.router.navigate(["/teacher"]);
                        localStorage.setItem('role', 'superAdmin');
                        break;
                    case "admin":
                        this.router.navigate(["/teacher"]);
                        localStorage.setItem('role', 'admin');
                        break;
                    case "user":
                        this.router.navigate(["/profile"]);
                        localStorage.setItem('role', 'user');
                        break;
                    default:
                        console.log("error sa role");
                }

          }else{
            console.log("Wrong password")  
          }
        }else{
          console.log("Wrong Email")
        }
      })
    }
}
