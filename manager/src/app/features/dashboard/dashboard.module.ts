import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CourseContainerComponent } from './home/course-container/course-container.component';
import { ProfileContainerComponent } from './home/profile-container/profile-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { logFeature } from '../auth/store/log.reducer';
import { LogEffects } from '../auth/store/log.effects';

@NgModule({
  declarations: [
    HomeComponent,
    CourseContainerComponent,
    ProfileContainerComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature(logFeature),
    EffectsModule.forFeature(LogEffects),
  ],
  exports:[HomeComponent]
})
export class DashboardModule { }
