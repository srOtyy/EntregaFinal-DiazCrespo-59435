import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { DetailsComponent } from './details/details.component';
import { ClassesComponent } from './classes/classes.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  {
    path:'',
    component:CoursesListComponent
  },
  {
    path:'details/:id',
    component:DetailsComponent
  },
  {
    path:'edit', // para crear 
    component: EditCourseComponent
  }
  ,{
    path:'edit/:id', //para editar
    component: EditCourseComponent
  }
  ,
  {
    path:'classes/:id',
    component:ClassesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
