import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogActions } from './log.actions';
import { Action } from '@ngrx/store';

import { ApiService } from '../../../core/services/api.service';
import { SnackbarServiceService } from '../../../shared/snackbar-service.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class LogEffects {
  loadCurrentUser$: Actions<Action<string>>;
  loadUpdateCurrentUser$: Actions<Action<string>>;
  loadLogout$: Actions<Action<string>>;
  constructor(
    private actions$: Actions,
    private api:ApiService,
    private snackbar:SnackbarServiceService,
    private _auth:AuthService
  ) {
    this.loadCurrentUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LogActions.loadCurrentUser),
        concatMap((data) =>
          this.api.findStudentById(data.id).pipe(
            map((response) => LogActions.loadCurrentUserSucces({ student: response })),
            catchError((error) => of(LogActions.loadCurrentUserError({ error })))
          )
        )
      )
    })
    this.loadUpdateCurrentUser$ = createEffect(()=> {
      return this.actions$.pipe(
        ofType(LogActions.loadUpdateUser),
        concatMap((data)=> 
        this.api.updateStudent(data.id,data.student).pipe(
          map((response)=> {
            this._auth.emit(response)
            return LogActions.loadUpdateUserSucces({student: response})
          }),
          catchError((error) => {
            this.snackbar.openSnackBar("Error al actualizar","Ok")
            return of(LogActions.loadCurrentUserError({ error }))
          })
        ))
      )
    })
    this.loadLogout$ = createEffect(()=> {
      return  this.actions$.pipe(
        ofType(LogActions.loadLogout),
        map(()=> LogActions.loadLogoutSucces())
      )
    })
  }
}
