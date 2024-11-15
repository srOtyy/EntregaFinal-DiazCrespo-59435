import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Subscription } from 'rxjs';
import {Store} from '@ngrx/store'
import { CoursesActions } from '../../store/course.actions';
import { ICourse } from '../../../../../shared/interface';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit, OnDestroy{
  editing: boolean = false
  courseId: string = ''
  course: ICourse | null = null
  index: number = 0
  suscription: Subscription | null = null
  
  formulario: FormGroup = new FormGroup({
    topic: new FormControl('',[Validators.required]),
  })

  constructor(
    private _coursesService:CoursesService,
    private dialogRef: MatDialogRef<ModalFormComponent>,
    private store:Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit(): void {
    if(this.data.topic){
      this.editing = true
      this.formulario.patchValue(this.data)
    }
    this.courseId = this.data.id
    this.getCourse()
    
  }
  ngOnDestroy(): void {
    this.unsuscribe()
  }
  unsuscribe(){
    if(this.suscription){
      this.suscription.unsubscribe()
      this.suscription = null
    }
  }
  close():void{
    this.unsuscribe()
    this.dialogRef.close()
  }
  getCourse(){
    this.suscription  = this._coursesService.findCourseById(this.courseId).subscribe({
      next: data => {
        if(data){
          this.course = data
          if(this.editing){
            this.index = this.course.classes.findIndex( (item) => item == this.data.topic)
          }
        }
      }
    })


  }
  addClass(){
    if(this.course){
      this.course.classes = [...this.course.classes, this.formulario.get('topic')?.value]
      this.store.dispatch(CoursesActions.loadAddClasssCourse({course: this.course}))

    }
    

  }
  updateClass(){
    if(this.course){
      this.course.classes.splice(this.index,1,this.formulario.get('topic')?.value)
      this.store.dispatch(CoursesActions.loadUpdateClasssCourse({course: this.course}))
    }
    

  }
  send(){
    if(!this.editing){
      this.addClass()
    }else{
      this.updateClass()
    }
    this.close()
  }
}
