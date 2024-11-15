import { Injectable, OnDestroy } from '@angular/core';
import { ICourse} from '../../shared/interface';
import { BehaviorSubject, catchError, map, Observable, of, Subject, takeUntil} from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class CoursesService implements OnDestroy{
  private coursesSubject: BehaviorSubject<ICourse[]> = new BehaviorSubject<ICourse[]>([])
  private destroy$ = new Subject<void>(); //esto va a manejar las desuscripciones

  constructor(
    private _api:ApiService
  ){ 
    this._api.getCourses().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: data=> {
        this.coursesSubject.next(data)
      },
      error:err=> console.log("No se pudieron obtener los cursos desde la API.",err)
    })
  }
  emit(){
    this._api.getCourses().subscribe(
      data => this.coursesSubject.next(data)
    )
  }
  getObservable(): Observable<ICourse[]>{
    return this.coursesSubject.asObservable()
  }

  findCourseById(id: string): Observable<ICourse | null> {
    return this._api.findCourseById(id).pipe(
      catchError(() => {
        console.log("Error buscando el curso (via ID) por la API ");
        return of(null);  
      }),
      takeUntil(this.destroy$)
    );
  }
  
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
