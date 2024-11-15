import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { ModalComponent } from './modal/modal.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { CoursesListModalComponent } from './courses-list-modal/courses-list-modal.component';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import {StoreModule} from '@ngrx/store'
import { studentFeature } from './store/student.reducer';
import { ApiService } from '../../../core/services/api.service';


@NgModule({
  declarations: [
    StudentsListComponent,
    ModalComponent,
    EditStudentComponent,
    CoursesListModalComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,SharedModule,
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects])
  ],
  providers:[ ApiService],
  exports:[StudentsListComponent]
})
export class StudentsModule { }
