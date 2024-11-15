import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { logFeature } from './store/log.reducer';
import { LogEffects } from './store/log.effects';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    DialogComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(logFeature),
    EffectsModule.forFeature(LogEffects),

  ]
})
export class AuthModule { }
