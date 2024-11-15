import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { FirstNamePipe } from '../core/pipes/first-name.pipe';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarServiceService } from './snackbar-service.service';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [FirstNamePipe],
  imports: [
    MatListModule,MatFormFieldModule,ReactiveFormsModule,FormsModule,MatButtonModule,MatIconModule,MatInputModule,MatToolbarModule,MatSidenavModule,MatSelectModule,MatStepperModule,MatSnackBarModule,MatDialogModule
  ],
  exports:[MatListModule,MatFormFieldModule,ReactiveFormsModule,FormsModule,MatButtonModule,MatIconModule,MatInputModule,MatToolbarModule,MatSidenavModule,MatSelectModule,FirstNamePipe,MatStepperModule,MatSnackBarModule,MatDialogModule],
  providers: [SnackbarServiceService]
})
export class SharedModule { }
