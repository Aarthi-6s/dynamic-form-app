import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../core/services/form-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizePipe } from '../../shared/pipes/capitalize-pipe';
import { HighlightInvalidDirective } from '../../shared/directives/highlight-invalid';
import { LifecycleDemoComponent } from '../../shared/lifecycle-demo/lifecycle-demo';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CapitalizePipe, HighlightInvalidDirective, LifecycleDemoComponent],
  templateUrl: './form-builder.html',
  styleUrls: ['./form-builder.css']
})

export class FormBuilderComponent implements OnInit {
  dynamicForm!: FormGroup;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([], [this.uniqueLabelValidator])
    });

    // Edit Mode
    this.route.queryParams.subscribe(params => {
      if (params['editId'] !== undefined) {
        this.editId = +params['editId'];
        const formData = this.formDataService.getFormById(this.editId);
        if (formData) {
          this.loadFormData(formData);
        }
      }
    });
  }

  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    const fieldGroup = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', Validators.required]
    });
    this.fields.push(fieldGroup);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  /** Load existing form data */
  loadFormData(form: any) {
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

  /** ✅ Custom validator for unique labels */
  uniqueLabelValidator(control: AbstractControl): ValidationErrors | null {
    const fields = (control as FormArray).controls;
    const labels = fields.map(f => f.get('label')?.value?.trim().toLowerCase());
    const hasDuplicate = labels.some(
      (label, index) => labels.indexOf(label) !== index
    );
    return hasDuplicate ? { duplicateLabel: true } : null;
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      alert('Please fix validation errors before saving!');
      this.dynamicForm.markAllAsTouched();
      return;
    }

    if (this.editId !== null) {
      this.formDataService.updateForm(this.editId, this.dynamicForm.value);
      alert('Form updated successfully!');
    } else {
      this.formDataService.addFormData(this.dynamicForm.value);
      alert('Form data saved successfully!');
    }

    this.router.navigate(['/forms/list']);
  }
}
