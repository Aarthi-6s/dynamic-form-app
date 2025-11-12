import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../core/services/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mini-form.html',
  styleUrl: './mini-form.css'
})
export class MiniFormComponent {
  formData = {
    name: '',
    email: '',
    age: ''
  };

  constructor(private formDataService: FormDataService, private router: Router) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.age) {
      alert('Please fill all fields!');
      return;
    }

    this.formDataService.addFormData(this.formData);
    alert('Mini Form saved successfully!');
    this.router.navigate(['/forms/list']);
  }
}
