import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IStudent, ICourse, IComission } from '../../shared/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService{

  private baseURL = environment.apiBaseURL;

  constructor( private httpClient: HttpClient) {}
  
  //students
  getStudents(): Observable<IStudent[]>{
    return this.httpClient.get<IStudent[]>(`${this.baseURL}/students`)
  }
  addStudent(student: Omit<IStudent, 'id'>): Observable<IStudent>{
    return this.httpClient.post<IStudent>(`${this.baseURL}/students`,student)
  }
  deleteStudent(id: string): Observable<IStudent>{
   return this.httpClient.delete<IStudent>(`${this.baseURL}/students/${id}`)
  }
  updateStudent(id: string,studentEdit:Partial<IStudent>): Observable<IStudent>{
    return this.httpClient.patch<IStudent>(`${this.baseURL}/students/${id}`,studentEdit)
  }
  findStudentById(id: string): Observable<IStudent>{
    return this.httpClient.get<IStudent>(`${this.baseURL}/students/${id}`)
  }
  
  //courses
  getCourses(): Observable<ICourse[]>{
    return this.httpClient.get<ICourse[]>(`${this.baseURL}/courses`)
  }
  addCourses({name,category,professor,classes,description,comissions}:
    {name: string,category:string,professor: string, classes: string[],description: string, comissions:IComission[]}):
    Observable<ICourse>{
    return this.httpClient.post<ICourse>(`${this.baseURL}/courses`,{name,category,professor,classes,description,comissions})
  }
  deleteCourses(id: string): Observable<ICourse>{
   return this.httpClient.delete<ICourse>(`${this.baseURL}/courses/${id}`)
  }
  updateCourses(id: string,courseEdit:Partial<ICourse>): Observable<ICourse>{
    return this.httpClient.patch<ICourse>(`${this.baseURL}/courses/${id}`,courseEdit)
  }
  findCourseById(id: string): Observable<ICourse>{
    return this.httpClient.get<ICourse>(`${this.baseURL}/courses/${id}`)
  }
  // comissions
  getAllComissions(){
    return this.httpClient.get<IComission[]>(`${this.baseURL}/comission`)
  } 
}
