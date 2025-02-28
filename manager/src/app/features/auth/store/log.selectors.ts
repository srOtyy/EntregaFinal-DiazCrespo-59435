import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLog from './log.reducer';

export const selectLogState = createFeatureSelector<fromLog.State>(
  fromLog.logFeatureKey
);
export const selectLog = createSelector(
  selectLogState,
  (state)=> state.log
)
