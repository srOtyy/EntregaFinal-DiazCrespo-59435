import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent } from '../../../shared/interface';
export const LogActions = createActionGroup({
  source: 'Log',
  events: {
    'Load Current User': props<{ id: string }>(),
    'Load Current User Succes': props<{student: IStudent}>(),
    'Load Current User Error': props<{error: string}>(),

    'Load Update User': props<{id: string,student: Partial<IStudent>}>(),
    'Load Update User Succes': props<{student: IStudent}>(),
    'Load Update User error': props<{error: string}>(),
  
    'Load Logout ': emptyProps(),
    'Load Logout Succes': emptyProps(),
    'Load Logout Error': emptyProps(),
  }
});
