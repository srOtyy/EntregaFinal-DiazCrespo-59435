import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { DetailsComponent } from './details/details.component';
import { InscriptionComponent } from './details/inscription/inscription.component';
import { ClassesComponent } from './classes/classes.component';
import { ModalFormComponent } from './classes/modal-form/modal-form.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store'
import { CourseEffects } from './store/course.effects';
import { courseFeature } from './store/course.reducer';
@NgModule({
  declarations: [
    CoursesListComponent,
      DetailsComponent,
      InscriptionComponent,
      ClassesComponent,
      ModalFormComponent,
      EditCourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CourseEffects])
  ],
  exports:[CoursesListComponent]
})
export class CoursesModule { }
