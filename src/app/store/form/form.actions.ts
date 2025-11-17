import { createAction, props } from '@ngrx/store';
//createAction:Used to define an action—a plain object describing an event in your app (like adding, updating, or deleting a form). 
//props:Used to specify the payload (data) that the action carries.
export const loadForms = createAction('[Form] Load Forms');

export const loadFormsSuccess = createAction(
  '[Form] Load Forms Success',
  props<{ forms: any[] }>()
);

export const addForm = createAction(
  '[Form] Add Form',
  props<{ form: any }>()
);

export const updateForm = createAction(
  '[Form] Update Form',
  props<{ id: number; form: any }>()
);

export const deleteForm = createAction(
  '[Form] Delete Form',
  props<{ id: number }>()
);

