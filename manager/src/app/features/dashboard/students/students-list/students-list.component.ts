import { Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IStudent } from '../../../../shared/interface';
import { StudentService } from '../../../../core/services/student.service';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';
import { Store } from '@ngrx/store';
import { StudentActions } from '../store/student.actions';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
  studentList: IStudent[] = []
  currentStudent$: Observable<IStudent | null>
  readonly dialog = inject(MatDialog);
  private suscription: Subscription | null = null; 
  
  constructor(
    private _studentsService:StudentService,
    private _snackbar: SnackbarServiceService,
    private store:Store,
    private _authService:AuthService
  ){
    this.currentStudent$ =this._authService.authStudent$
    this._authService.updateComponentName("student-list")
  }
  
  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents())
    this.suscribe()
  }
  ngOnDestroy(): void {
    this.unsuscribe()
  }
  suscribe():void{
    this.suscription = this._studentsService.getObservable().subscribe({
      next: data => this.studentList = data,
      error: error=> {
        this._snackbar.openSnackBar("error en la suscripcion","Ok")
        console.log("error en la suscripcion",error)}
    })
  }
  unsuscribe():void{
    if(this.suscription){
      this.suscription.unsubscribe()
      this.suscription = null
    }
  }
  deleteStudent(id: string):void{
    this.store.dispatch(StudentActions.loadDeleteStudent({id}))

  }
  openModal(student?: IStudent): void {
    if(student){//editando
      const dialogRef = this.dialog.open(ModalComponent,{
        data: student
      });
      dialogRef.afterClosed().subscribe();
     
    }else{//creando
      const dialogRef = this.dialog.open(ModalComponent);
      dialogRef.afterClosed().subscribe();

    }
  }

}
