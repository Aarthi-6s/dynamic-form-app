import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.models';

export const selectFormFeature = createFeatureSelector<FormState>('form');

export const selectAllForms = createSelector(
  selectFormFeature,
  (state) => state.forms
);

export const selectFormById = (id: number) =>
  createSelector(selectAllForms, (forms) => forms[id]);


