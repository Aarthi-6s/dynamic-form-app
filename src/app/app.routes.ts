import { Routes } from '@angular/router';
import { FormBuilderComponent } from './forms/form-builder/form-builder';
import { FormListComponent } from './forms/form-list/form-list';
import { FormDetailComponent } from './forms/form-detail/form-detail';
import { MiniFormComponent } from './forms/mini-form/mini-form';

export const routes: Routes = [
  { path: '', redirectTo: 'forms', pathMatch: 'full' },
  { path: 'forms', component: FormBuilderComponent },
  { path: 'forms/list', component: FormListComponent },
  { path: 'forms/detail/:id', component: FormDetailComponent },
  { path: 'forms/mini', component: MiniFormComponent },
  {
  path: 'settings',
  loadComponent: () =>
    import('./settings/settings-home/settings-home').then(m => m.SettingsHomeComponent)
  }


];
