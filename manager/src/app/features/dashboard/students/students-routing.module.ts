import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path:'',
    component:StudentsListComponent
  },
  {
    path:'edit/:id', 
    component: EditStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
