import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './login/_Auth/auth.guard';
import { loginGuard } from './login/_Auth/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { RoleAuthGuard } from './login/_Auth/role.guard';
import { TeacherLeaderboardComponent } from './teacher-leaderboard/teacher-leaderboard.component';
import { HeadLeaderboardComponent } from './head-leaderboard/head-leaderboard.component';
import { HeadDashboardComponent } from './head-dashboard/head-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'teacher-leaderboard',
    component: TeacherLeaderboardComponent,
    // canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ['teacher'],
    },
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboardComponent,
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ['teacher'],
    },
  },
  {
    path: 'head-leaderboard',
    component: HeadLeaderboardComponent,
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ['headTeacher'],
    },
  },
  {
    path: 'head-dashboard',
    component: HeadDashboardComponent,
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ['headTeacher'],
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard, RoleAuthGuard],
    data: {
      role: ['teacher', 'headTeacher', 'student'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
