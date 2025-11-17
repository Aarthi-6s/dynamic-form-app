import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectFormById } from '../../store/form/form.selectors';
import { Observable } from 'rxjs';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule],
  templateUrl: './form-detail.html',
  styleUrls: ['./form-detail.css']
})
export class FormDetailComponent implements OnInit {
  form$!: Observable<any | null>;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : 0;
      this.form$ = this.store.select(selectFormById(this.id));
    });
  }
}
