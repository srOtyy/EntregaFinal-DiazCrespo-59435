import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup} from '@angular/forms';
import { ICourse, IStudent } from '../../../../../shared/interface';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnDestroy, OnInit{
  @Input() course: ICourse | null = null
  comision: string = ''
  registrationCompleted: boolean = false
  student: IStudent | null = null
  constructor(private _authService:AuthService){
    
  }

  formulario: FormGroup = new FormGroup({
    comision: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this._authService.authStudent$.subscribe(
      data => this.student = data
    )
  }
  ngOnDestroy(): void {
    if(this.registrationCompleted && this.course){
      this.addNewCourse(this.course.id)
    }
  }
  confirm(){
    this.registrationCompleted = true
  }
  addNewCourse(id: string){
    if(this.student){
      this._authService.addCourse(id,this.student.id)
    }
  }
}
