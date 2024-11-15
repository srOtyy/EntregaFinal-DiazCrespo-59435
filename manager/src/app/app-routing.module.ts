import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: ()=> import('./features/dashboard/dashboard.module').then((m)=>m.DashboardModule),
    canActivate:[loginGuard]
  },
  {
    path:'auth',
    loadChildren: ()=> import('./features/auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
