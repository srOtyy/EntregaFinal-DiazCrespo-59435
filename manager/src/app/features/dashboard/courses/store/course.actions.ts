import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourse } from '../../../../shared/interface';

export const CoursesActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Succes': props<{courses: ICourse[]}>(),
    'Load Courses Error': props<{error: string}>(),
    
    'Load Add Course': props<{course: ICourse}>(),
    'Load Add Course Succes': props<{course: ICourse}>(),
    'Load Add Course Error': props<{error: string}>(),
    
    'Load Delete Course': props<{id: string}>(),
    'Load Delte Course Success': props<{id: string}>(),
    'Load Delte Course Error': props<{error: string}>(),

    'Load Update Course': props<{course: ICourse}>(),
    'Load Update Course Succes': props<{course: ICourse}>(),
    'Load Update Course Error': props<{error: string}>(),

    'Load Delete ClasssCourse': props<{course: ICourse}>(),
    'Load Add ClasssCourse': props<{course: ICourse}>(),
    'Load Update ClasssCourse': props<{course: ICourse}>()
    
  }
});
