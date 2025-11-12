import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../core/services/form-data.service';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './form-list.html',
  styleUrl: './form-list.css'
})
export class FormListComponent implements OnInit {
  forms: any[] = [];

  constructor(
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.forms = this.formDataService.getAllForms();
  }

  deleteForm(index: number) {
    if (confirm('Are you sure you want to delete this form?')) {
      this.formDataService.deleteForm(index);
      this.loadForms();
    }
  }

  editForm(index: number) {
    // navigate to builder page with edit id
    this.router.navigate(['/forms'], { queryParams: { editId: index } });
  }
}
