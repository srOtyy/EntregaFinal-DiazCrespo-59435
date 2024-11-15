import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil} from 'rxjs';
import { ICourse, IStudent } from '../../shared/interface';
import { StudentService } from './student.service';
import { ApiService } from './api.service';
import { SnackbarServiceService } from '../../shared/snackbar-service.service';
import {Store} from '@ngrx/store'
import { LogActions } from '../../features/auth/store/log.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private _authStudent$ = new BehaviorSubject<null | IStudent>(null)
  public authStudent$ = this._authStudent$.asObservable()
  private _coursesList$ = new BehaviorSubject<ICourse[]>([]);
  public coursesList$ = this._coursesList$.asObservable();
  private destroy$ = new Subject<void>(); //esto va a manejar las desuscripciones
  private _componentName$ = new BehaviorSubject<string>('')
  public componentName$ = this._componentName$.asObservable()
  constructor(
    private _studentsService:StudentService,
    private _api:ApiService,
    private _snackbar: SnackbarServiceService,
    private store:Store
  ){}
  
  setCourses(){
    this._api.getCourses().pipe(
      map( courses => courses.filter( course => this._authStudent$.value?.courses.includes(course.id))),
      takeUntil(this.destroy$)
    ).subscribe(data => this._coursesList$.next(data))
  }
  checkToken(token: string) {
    this._studentsService.getObservable().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: students => {
        const student = students.find(student => student.token === token)
        if (student) {
          this.emit(student)
        }
      },
      error: () => this._snackbar.openSnackBar("no se pudo autenticar el token", "Ok")
    })
  }
  emit(student: IStudent){
    this._authStudent$.next(student)
  }
  logout(){
    this._authStudent$.next(null)
    this.store.dispatch(LogActions.loadLogout())
  }
  login({name,email}: {name: string, email:string}){
    const student = this._studentsService.findStudent({name,email})
    if(student){
      localStorage.setItem('token', student.token)
      this._authStudent$.next(student)
      this.store.dispatch(LogActions.loadCurrentUser({id: student.id}))
      return true
    }else{
      return false
    }
  }
  addCourse(courseId: string, studentId: string): void {
    const currentStudent = this._authStudent$.value
    if (currentStudent) {
      const coursesList = [...currentStudent.courses, courseId];
      this.store.dispatch(LogActions.loadUpdateUser({id: studentId, student: {courses: coursesList}}))
      this.setCourses()
      
    }
  }
  leaveCourse(courseId:string, studentId: string){
      const currentStudent = this._authStudent$.value
      if(currentStudent){
        const coursesList = currentStudent.courses.filter(course => course != courseId)
        this.store.dispatch(LogActions.loadUpdateUser({id: studentId, student: {courses: coursesList}}))
        this.setCourses()
          
      }
  }
  updateComponentName(name: string): void {
    setTimeout(() => {
      this._componentName$.next(name)
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}

