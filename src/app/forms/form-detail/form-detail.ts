import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../core/services/form-data.service';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './form-detail.html',
  styleUrl: './form-detail.css'
})
export class FormDetailComponent implements OnInit {
  form: any;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formDataService: FormDataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : 0;
      this.form = this.formDataService.getFormById(this.id);
    });
  }
}
