import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form.actions';
import { FormState } from './form.models';

const STORAGE_KEY = 'dynamicForms';

// helper: load from localStorage
function loadFromStorage(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(forms: any[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch {}
}

export const initialState: FormState = {
  forms: loadFromStorage(),
  loading: false,
  error: null
};

export const formReducer = createReducer(
  initialState,
  on(FormActions.loadForms, state => ({ ...state, loading: true })),
  on(FormActions.loadFormsSuccess, (state, { forms }) => ({ ...state, forms, loading: false })),
  on(FormActions.addForm, (state, { form }) => {
    const newForms = [...state.forms, form];
    saveToStorage(newForms);
    return { ...state, forms: newForms };
  }),
  on(FormActions.updateForm, (state, { id, form }) => {
    const newForms = state.forms.map((f, idx) => (idx === id ? form : f));
    saveToStorage(newForms);
    return { ...state, forms: newForms };
  }),
  on(FormActions.deleteForm, (state, { id }) => {
    const newForms = state.forms.filter((_, idx) => idx !== id);
    saveToStorage(newForms);
    return { ...state, forms: newForms };
  })
);
