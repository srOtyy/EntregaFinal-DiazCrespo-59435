import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { StudentActions } from '../store/student.actions';
import { generateToken } from '../../../../shared/utils';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  creating: boolean = true
  btnText: string = 'Crear'

  formulario: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    courses: new FormControl([]),
    token: new FormControl('')
  })

  
  constructor(
  
    private dialogRef: MatDialogRef<ModalComponent>,
    private store:Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    if(this.data){
      this.creating = false;
      this.btnText = 'Guardar'
      this.formulario.patchValue(this.data)
    }
  }
  close():void{
    this.dialogRef.close()
  }

  
  // ABM
  addNewUser():void{
    this.formulario.patchValue({token: generateToken()})
    this.store.dispatch(StudentActions.loadAddStudent({student: this.formulario.value}))
   
  }
  updateUser():void{
    this.store.dispatch(StudentActions.loadUpdateStudent({id: this.data.id, student: this.formulario.value}))

  }
  send():void{
    if(this.creating){
      this.addNewUser()
    }else{
      this.updateUser()
    }
    this.close()
    
  }
 
}
