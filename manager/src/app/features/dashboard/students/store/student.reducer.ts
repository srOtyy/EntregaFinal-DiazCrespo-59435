import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { IStudent } from '../../../../shared/interface';

export const studentFeatureKey = 'student';

export interface State {
  students: IStudent[]
  error: string | null
}

export const initialState: State = {
  students: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudentsSucces, (state, {students}) => {
    return {
      ...state,
      students
    }
  }),
  on(StudentActions.loadStudentsError, (state, {error}) => {
    return {
      ...state,
      error
    }
  }),

  on(StudentActions.loadDeleteStudentSucces, (state, {id}) => {
    const newArray = state.students.filter(student => student.id != id)
    return {
      ...state,
      students: newArray
    }
  }),
  on(StudentActions.loadDeleteStudentError, (state, {error}) => {
    return {
      ...state,
      error
    }
  }),
  on(StudentActions.loadAddStudentSucces, (state , {student}) => {
    return {
      ...state,
      students: [...state.students,student]
    }
  }),
  on(StudentActions.loadAddStudentError, (state, {error}) => {
    return{
      ...state,
      error
    }
  }),
  on(StudentActions.loadUpdateStudentSucces, (state, {student}) => {
    const newArrayStudents= state.students.map( currentStudent =>
      currentStudent.id === student.id ? student : currentStudent 
    )
    return {
      ...state,
      students: newArrayStudents
    }
  }),
  on(StudentActions.loadUpdateStudentError, (state, {error}) => {
    return{
      ...state,
      error
    }
  }),

)

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

