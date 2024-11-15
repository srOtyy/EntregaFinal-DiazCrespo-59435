import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, count, map } from 'rxjs/operators';
import {  of } from 'rxjs';
import { CoursesActions } from './course.actions';
import { Action } from '@ngrx/store';
import { ApiService } from '../../../../core/services/api.service';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class CourseEffects {

  loadCourses$: Actions<Action<string>>
  loadAddCourses$: Actions<Action<string>>
  loadDeleteCourses$: Actions<Action<string>>
  loadUpdateCourses$: Actions<Action<string>>
  loadDeleteCoursesClass$: Actions<Action<string>>
  loadAddCoursesClass$: Actions<Action<string>>
  loadUpdateCoursesClass$: Actions<Action<string>>

  constructor(
    private actions$: Actions,
    private _api:ApiService,
    private snackbar:SnackbarServiceService,
    private _coursesService:CoursesService
  ) {
    
      this.loadCourses$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(CoursesActions.loadCourses),
          concatMap(()=> 
            this._api.getCourses().pipe(
              map((courses)=> CoursesActions.loadCoursesSucces({courses})),
              catchError((error) => {
                this.snackbar.openSnackBar("Error al cargar los cursos","Ok")
                return of(CoursesActions.loadCoursesError({ error: error.message }))
              })
            )
        ))
      })

      this.loadAddCourses$ = createEffect( ()=> {
        return this.actions$.pipe(
          ofType(CoursesActions.loadAddCourse),
          concatMap((prop)=>
          this._api.addCourses(prop.course).pipe(
            map((course)=> {
              this.snackbar.openSnackBar("Curso agregado","Ok")
              this._coursesService.emit()
              return CoursesActions.loadAddCourseSucces({course})
            }),
            catchError((error) => {
              this.snackbar.openSnackBar("Error al agregar el curso","Ok")
              return of(CoursesActions.loadAddCourseError({ error: error.message }))
            })
          ))
        )
      })

      this.loadDeleteCourses$ = createEffect( ()=> {
        return this.actions$.pipe(
          ofType(CoursesActions.loadDeleteCourse),
          concatMap((prop)=> 
            this._api.deleteCourses(prop.id).pipe(
              map((course)=>{
                this.snackbar.openSnackBar("Curso eliminado","Ok")
                this._coursesService.emit()
                return CoursesActions.loadDelteCourseSuccess({id: course.id})
              }),
              catchError((error) => {
                this.snackbar.openSnackBar("Error al agregar el curso","Ok")
                return of(CoursesActions.loadDelteCourseError({ error: error.message }))
              })
            )
          )
          
        )
      })

      this.loadUpdateCourses$ = createEffect( ()=> {
        return this.actions$.pipe(
          ofType(CoursesActions.loadUpdateCourse),
          concatMap((prop) =>
          this._api.updateCourses(prop.course.id, prop.course).pipe(
            map((course)=>{
              this.snackbar.openSnackBar("Curso actualizado","Ok")
              this._coursesService.emit()
              return CoursesActions.loadUpdateCourseSucces({course})
            }),
            catchError((error) => {
              this.snackbar.openSnackBar("Error al actualizar el curso","Ok")
              return of(CoursesActions.loadUpdateCourseError({ error: error.message }))
            })
          ))
        )
      })

      this.loadDeleteCoursesClass$ = createEffect(()=> {
        return this.actions$.pipe(
          ofType(CoursesActions.loadDeleteClasssCourse),
          concatMap((prop)=>
          this._api.updateCourses(prop.course.id,prop.course).pipe(
            map((course)=>{
              this.snackbar.openSnackBar("Clase eliminada","Ok")
              this._coursesService.emit()
              return CoursesActions.loadUpdateCourseSucces({course})
            }),
            catchError((error) => {
              this.snackbar.openSnackBar("Error al eliminar","Ok")
              return of(CoursesActions.loadUpdateCourseError({ error: error.message }))
            })
          ))
        )
      })
      this.loadUpdateCoursesClass$ = createEffect( ()=> {
        return this.actions$.pipe(
          ofType(CoursesActions.loadUpdateClasssCourse),
          concatMap((prop)=>
          this._api.updateCourses(prop.course.id,prop.course).pipe(
            map((course)=>{
              this.snackbar.openSnackBar("Clase editada","Ok")
              this._coursesService.emit()
              return CoursesActions.loadUpdateCourseSucces({course})
            }),
            catchError((error) => {
              this.snackbar.openSnackBar("Error al editar","Ok")
              return of(CoursesActions.loadUpdateCourseError({ error: error.message }))
            })
          ))
        )
      })
      this.loadAddCoursesClass$ = createEffect( ()=> {
        return this.actions$.pipe(
          ofType(CoursesActions.loadAddClasssCourse),
          concatMap((prop)=>
          this._api.updateCourses(prop.course.id,prop.course).pipe(
            map((course)=>{
              this.snackbar.openSnackBar("Clase agregadea","Ok")
              this._coursesService.emit()
              return CoursesActions.loadUpdateCourseSucces({course})
            }),
            catchError((error) => {
              this.snackbar.openSnackBar("Error al agregar","Ok")
              return of(CoursesActions.loadUpdateCourseError({ error: error.message }))
            })
          ))
        )
      })
    }
}
