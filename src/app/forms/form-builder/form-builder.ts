import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as FormActions from '../../store/form/form.actions';

// Shared Pipes & Directives
import { CapitalizePipe } from '../../shared/pipes/capitalize-pipe';
import { HighlightInvalidDirective } from '../../shared/directives/highlight-invalid';
import { LifecycleDemoComponent } from '../../shared/lifecycle-demo/lifecycle-demo';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CapitalizePipe,
    HighlightInvalidDirective,
    LifecycleDemoComponent,

    // PrimeNG
    ButtonModule,
    ToastModule,
    MessageModule,
    CardModule
  ],
  providers: [MessageService],
  templateUrl: './form-builder.html',
  styleUrls: ['./form-builder.css']
})
export class FormBuilderComponent implements OnInit {
  dynamicForm!: FormGroup;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([], [this.uniqueLabelValidator])
    });

    // --------- EDIT MODE (NgRx version) ------------
    this.route.queryParams.subscribe(params => {
      if (params['editId'] !== undefined) {
        this.editId = +params['editId'];

        // Select all forms from store and find match
        this.store.select(state => state.form.forms).subscribe(forms => {
          const formData = forms.find((f: any, i: number) => i === this.editId);

          if (formData) {
            this.loadFormData(formData);
          }
        });
      }
    });
  }

  // Getter for fields
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    this.fields.push(
      this.fb.group({
        label: ['', [Validators.required, Validators.minLength(3)]],
        value: ['', Validators.required]
      })
    );
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  // Load existing form data in edit mode
  loadFormData(form: any) {
    if (!form || !form.fields) return;

    this.fields.clear();

    form.fields.forEach((f: any) => {
      this.fields.push(
        this.fb.group({
          label: [f.label, [Validators.required, Validators.minLength(3)]],
          value: [f.value, Validators.required]
        })
      );
    });
  }

  // Unique label validator
  uniqueLabelValidator(control: AbstractControl): ValidationErrors | null {
    const fields = (control as FormArray).controls;
    const labels = fields.map(f =>
      f.get('label')?.value?.trim()?.toLowerCase()
    );

    const hasDuplicate = labels.some(
      (label, index) => labels.indexOf(label) !== index
    );

    return hasDuplicate ? { duplicateLabel: true } : null;
  }

  // Submit: Add or Update Form
  onSubmit() {
    if (this.dynamicForm.invalid) {
      alert('Please fix validation errors before saving!');
      this.dynamicForm.markAllAsTouched();
      return;
    }

    if (this.editId !== null) {
      // Update form
      this.store.dispatch(
        FormActions.updateForm({
          id: this.editId,
          form: this.dynamicForm.value
        })
      );
      alert('Form updated successfully!');
    } else {
      // Add new form
      this.store.dispatch(
        FormActions.addForm({ form: this.dynamicForm.value })
      );
      alert('Form saved successfully!');
    }

    this.router.navigate(['/forms/list']);
  }

  goToMiniForm() {
    this.router.navigate(['/forms/mini']);
  }
}
