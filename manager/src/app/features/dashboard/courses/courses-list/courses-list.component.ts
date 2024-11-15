import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from '../../../../core/services/courses.service';
import { ICourse,IStudent } from '../../../../shared/interface';

import {Store} from '@ngrx/store'
import { CoursesActions } from '../store/course.actions';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit,OnDestroy{
  coursesList: ICourse[] = []
  currentStudent$: Observable<IStudent | null>
  private suscription: Subscription | null = null; 

  constructor(private _coursesService:CoursesService,
    private _authService:AuthService,
    private store:Store
  ){
    this.currentStudent$ =this._authService.authStudent$
    this._authService.updateComponentName("courses-list")
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
    this.suscribe()
  }
  ngOnDestroy(): void {
    this.unsuscribe()
  }
  suscribe():void{
    this.suscription = this._coursesService.getObservable().subscribe({
      next: data => this.coursesList = data,
      error: error=> console.log("error en la suscripcion",error)
    })
  }
  unsuscribe():void{
    if(this.suscription){
      this.suscription.unsubscribe()
      this.suscription = null
    }
  }
  deleteCourse(id: string):void{
    this.store.dispatch(CoursesActions.loadDeleteCourse({id}))
  }
 
}
