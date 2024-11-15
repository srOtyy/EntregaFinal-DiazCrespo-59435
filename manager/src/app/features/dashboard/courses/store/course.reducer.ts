import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './course.actions';
import { ICourse } from '../../../../shared/interface';

export const courseFeatureKey = 'course';

export interface State {
  courses: ICourse[]
  error: string | null

}

export const initialState: State = {
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCoursesSucces,( state, {courses}) => {
    return {
      ...state,
      courses
    }
  }),
  on(CoursesActions.loadCoursesError, (state , {error})=>{
    return{
      ...state,
      error
    }
  }),

  on(CoursesActions.loadAddCourseSucces,(state, {course})=> {
    return{
      ...state,
      courses: [...state.courses, course]
    }
  }),
  on(CoursesActions.loadAddCourseError, (state, {error})=>{
    return{
      ...state,
      error
    }
  }),

  on(CoursesActions.loadDelteCourseSuccess, (state, {id})=> {
    const newArray = state.courses.filter(course=> course.id != id)
    return{
      ...state,
      courses: newArray
    }
  }),
  on(CoursesActions.loadDelteCourseError, (state, {error})=> {
    return{
      ...state,
      error
    }
  }),

  on(CoursesActions.loadUpdateCourseSucces, (state, {course})=> {
    const newArray = state.courses.map(
      currentCourse => currentCourse.id != course.id ? currentCourse : course )
    return{
      ...state,
      courses: newArray
    }
  }),
  on(CoursesActions.loadUpdateCourseError, (state, {error})=> {
    return{
      ...state,
      error
    }
  }),

);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

