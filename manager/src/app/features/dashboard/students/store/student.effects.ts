import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentActions } from './student.actions';
import { ApiService } from '../../../../core/services/api.service';
import { Action } from '@ngrx/store';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';
import { StudentService } from '../../../../core/services/student.service';

@Injectable()
export class StudentEffects {

  loadStudents$: Actions<Action<string>>
  loadDeleteStudent$: Actions<Action<string>>
  loadAddtudent$: Actions<Action<string>>
  loadUpdateStudent$: Actions<Action<string>>

  constructor(
    private actions$: Actions,
    private _apiService: ApiService,
    private snackbar:SnackbarServiceService,
    private _studentService: StudentService

  ) {

    this.loadStudents$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.loadStudents),
        concatMap(() =>
          this._apiService.getStudents().pipe(
            map((students) => StudentActions.loadStudentsSucces({ students })),
            catchError((error) => {
              this.snackbar.openSnackBar("Error al cargar los estudiantes","Ok")
              return of(StudentActions.loadStudentsError({ error: error.message }))
            })
          )
        )
      )
    })
    
    this.loadDeleteStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.loadDeleteStudent),
        concatMap((prop) =>
          this._apiService.deleteStudent(prop.id).pipe(
            map((student) => {
              this.snackbar.openSnackBar("Estudiante eliminado","Ok")
              this._studentService.emit()
              return StudentActions.loadDeleteStudentSucces({ id: student.id })
            }),
            catchError((error) => of(StudentActions.loadStudentsError({ error: error.message })))
          )
        )
      )
    })

    this.loadAddtudent$ = createEffect(()=> {
      return this.actions$.pipe(
        ofType(StudentActions.loadAddStudent),
        concatMap((prop)=> 
          this._apiService.addStudent(prop.student).pipe(
          map((student)=> {
            this.snackbar.openSnackBar("Estudiante crado","Ok")
            this._studentService.emit()
            return StudentActions.loadAddStudentSucces({student})
          }),
          catchError((error)=> {
            this.snackbar.openSnackBar("Hubo un error al crear el estudiante","Ok")
            return of(StudentActions.loadAddStudentError({error: error.message}))
          })
        )
          
        )
      )
    })

    this.loadUpdateStudent$ = createEffect(()=> {
      return this.actions$.pipe(
        ofType(StudentActions.loadUpdateStudent),
        concatMap(({id, student})=>
        this._apiService.updateStudent(id,student).pipe(
          map((updatedStudent)=>{
            this.snackbar.openSnackBar("Estudiante actualizado","Ok")
            this._studentService.emit()
            return StudentActions.loadUpdateStudentSucces({student: updatedStudent})
          }),
          catchError((error)=> {
            this.snackbar.openSnackBar("Hubo un error al editar el estudiante","Ok")
            return of(StudentActions.loadAddStudentError({error: error.message}))
          })
        )
        )
      )
    })    
  }
}
