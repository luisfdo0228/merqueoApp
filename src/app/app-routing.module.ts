import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard'

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full',
  }, 
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) 
  }, 
  { 
    path: 'login', 
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'register', 
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule),
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
