import { createFeature, createReducer, on } from '@ngrx/store';
import { LogActions } from './log.actions';
import { IStudent } from '../../../shared/interface';



export const logFeatureKey = 'log';

export interface State {
  log: IStudent | null
  error: string | null
}

export const initialState: State = { // (*) : selector
  log: null,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(LogActions.loadCurrentUserSucces,( state, {student} )=> { //on(LogActions.accionDeseada, state => { return { ...sate, alguna lógica para el state}})
    return {
      ...state,
      log: student
    }
  }),
  on(LogActions.loadCurrentUserError, (state, {error}) => {
    return{
      ...state,
      error: error
    }
  }),
  on(LogActions.loadUpdateUserSucces, (state,{student})=> {
    return{
      ...state,
      log: student
    }
  }),
  on(LogActions.loadUpdateUserError, (state, {error}) => {
    return{
      ...state,
      error: error
    }
  }),
  on(LogActions.loadLogoutSucces, (state)=> {
    return{
      ...state,
      log: null
    }
  })

);

export const logFeature = createFeature({
  name: logFeatureKey,
  reducer,
});

