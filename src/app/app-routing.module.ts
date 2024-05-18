import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeacherComponent } from './teacher/teacher.component';
import { authGuard } from './login/_Auth/auth.guard';
import { loginGuard } from './login/_Auth/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RoleAuthGuard } from './login/_Auth/role.guard';


const routes: Routes = [
    { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },

  { 
    path: 'login', 
    component: LoginComponent ,
    canActivate: [loginGuard]
   
  },
  {
    path: 'teacher',
    component: TeacherComponent,  
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ["admin", "superAdmin"],
    },

  },
  {
    path: 'profile',
    component: ProfileComponent,  
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ["admin", "superAdmin", "user"],
    },  
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,  
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ["admin", "superAdmin"],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
