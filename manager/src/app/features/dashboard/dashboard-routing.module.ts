import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      }
      ,
      {
       
        path: 'students',
        loadChildren: ()=> import('./students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'courses',
        loadChildren: ()=> import('./courses/courses.module').then(m=>m.CoursesModule)
      }
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
