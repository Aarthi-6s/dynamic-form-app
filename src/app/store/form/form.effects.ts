import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FormActions from './form.actions';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class FormEffects {

  loadForms$;
  //When the loadForms action is dispatched, loadForms$ runs code to fetch the forms.
  //It may then dispatch a loadFormsSuccess action with the loaded data.
  constructor(private actions$: Actions) {

    // Define effect *inside constructor* so actions$ is fully injected
    this.loadForms$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FormActions.loadForms),
        delay(500),
        map(() => {
          const raw = localStorage.getItem('dynamicForms');
          const forms = raw ? JSON.parse(raw) : [];
          return FormActions.loadFormsSuccess({ forms });
        })
      )
    );
  }
}
