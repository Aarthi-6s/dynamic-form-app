import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as FormActions from '../../store/form/form.actions';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mini-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, ToastModule],
  templateUrl: './mini-form.html',
  styleUrls: ['./mini-form.css'],
  providers: [MessageService]
})
export class MiniFormComponent {

  formData = {
    name: '',
    email: '',
    age: '',
    phone: '',
    country: '',
    gender: ''
  };

  constructor(
    private store: Store,
    private router: Router,
    private messageService: MessageService
  ) {}

  goBackToList() {
    this.router.navigate(['/forms/list']);
  }

  goToFormBuilder() {
    this.router.navigate(['/forms']);
  }

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.age || !this.formData.phone || !this.formData.country || !this.formData.gender) {
      alert('Please fill all fields!');
      return;
    }

    // Save using NgRx
    this.store.dispatch(FormActions.addForm({ form: this.formData }));

    // Show success toast
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Mini Form saved successfully!' });

    // Navigate back to list
    this.router.navigate(['/forms/list']);
  }
}
