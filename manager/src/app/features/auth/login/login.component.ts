import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators,} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { StudentService } from '../../../core/services/student.service';
import { SnackbarServiceService } from '../../../shared/snackbar-service.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  registering: boolean = false //este es el encargado de cambiar de formulario 1 crack
  accesDenied: boolean = false
  readonly dialog = inject(MatDialog);

  constructor(
    private _studentsService: StudentService,
    private _auth: AuthService,
    private _snackbar: SnackbarServiceService,
    private router:Router,
  ){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required])
  });
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    courses: new FormControl([]),
    token: new FormControl('')

  })
  
 
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
  changeForm():void{
    this.registering = !this.registering
  }
  //login form
  sendForm():void{
    if(!!this._auth.login(this.loginForm.value)){
      this.accesDenied = false   
      this.router.navigate(['dashboard/home'])   
    }else{
      this.accesDenied = true
      this.loginForm.reset()
      this.loginForm.markAllAsTouched()
    }
  }
  //register form
  createNewUser():void{
    this._studentsService.addStudent(this.registerForm.value)
    this.changeForm()
    this._snackbar.openSnackBar("Usuario creado con exito!","Ok")
    this.loginForm.reset()
  }
 

}


