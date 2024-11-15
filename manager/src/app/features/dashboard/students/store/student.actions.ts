import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent } from '../../../../shared/interface';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Succes': props<{ students: IStudent[] }>(),
    'Load Students Error': props<{ error: string }>(),
    
    'Load Delete Student': props<{id: string}>(),
    'Load Delete Student Succes': props<{id: string}>(),
    'Load Delete Student Error': props<{error: string}>(),
    
    'Load Add Student': props<{student: Omit<IStudent,'id'>}>(),
    'Load Add Student Succes': props<{student: IStudent}>(),
    'Load Add Student Error': props<{error: string}>(),


    'Load Update Student': props<{id: string, student: Partial<IStudent>}>(),
    'Load Update Student Succes': props<{student: IStudent}>(),
    'Load Update Student Error': props<{error: string}>(),

  }
});
