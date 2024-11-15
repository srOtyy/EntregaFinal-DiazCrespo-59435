import { Injectable } from '@angular/core';
import { ICourse, IStudent } from '../../shared/interface';
import { BehaviorSubject,map,Observable} from 'rxjs';
import { ApiService } from './api.service';
import { generateToken } from '../../shared/utils';


@Injectable({
  providedIn: 'root'
})
export class StudentService{
  autenticated: boolean = false

  private studentsSubject: BehaviorSubject<IStudent[]> = new BehaviorSubject<IStudent[]>([])
  private studentArrayCoursesSubject: BehaviorSubject<ICourse[]> = new BehaviorSubject<ICourse[]>([])
  constructor(
    private _api:ApiService
  ){
    this._api.getStudents().subscribe({
      next: data => {
        this.studentsSubject.next(data)
      },
      error: err => console.log(err)
      }) 
  }


  getObservable(): Observable<IStudent[]>{
    return this.studentsSubject.asObservable()
  }
  addStudent(student: IStudent){
    student.token = generateToken()
    this._api.addStudent(student).subscribe({
      next: data => {
        const studentsList = this.studentsSubject.value
        const newList = [...studentsList,data]
        this.studentsSubject.next(newList)
      }
    })
  
  }
  updateStudent(id: string, studentEdit: Partial<IStudent>): void {
    this._api.updateStudent(id, studentEdit).subscribe({
      next: (data) => {
        const newList = this.studentsSubject.value.map(student => 
          student.id === id ? data : student
        );
        this.studentsSubject.next(newList);
      },
      error: () => console.log("Ocurrió un error en la actualización")
    });
  }
  emit():void{
    this._api.getStudents().subscribe(
      data => this.studentsSubject.next(data)
    )
  }
  //login
  findStudent({name,email}: {name: string, email:string}): IStudent | null{
    const std: IStudent | undefined = this.studentsSubject.value.find(
      student => student.email === email)
    if(std){
      if(std.name === name){
        this.autenticated = true
        return std
      }else{
        return null
      }
    }else{
      return null
    }
  }
  //edit student
  getArrayObservable(): Observable<ICourse[]>{
    return this.studentArrayCoursesSubject.asObservable()
  }
  setCourses(ids: string[]){
    this._api.getCourses().pipe(
      map(  courses => courses.filter(course => ids.includes(course.id))),
    ).subscribe(data => this.studentArrayCoursesSubject.next(data))
  }
  leaveCourse(id: string, student: IStudent){
    const newCoursesList = student.courses.filter(course => course != id)
    this.updateStudent(student.id,{courses:newCoursesList})
    
  }
  

}
