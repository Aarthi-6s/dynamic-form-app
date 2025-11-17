import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectAllForms } from '../../store/form/form.selectors';
import * as FormActions from '../../store/form/form.actions';

 
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, DialogModule, ToastModule],
  templateUrl: './form-list.html',
  styleUrls: ['./form-list.css'],
  providers: [MessageService]
})
export class FormListComponent implements OnInit {
  forms$!: Observable<any[]>;

  // Dialog state
  displayDelete: boolean = false;
  deleteIndex: number | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.forms$ = this.store.select(selectAllForms);
  }

  showDeleteDialog(index: number) {
    this.deleteIndex = index;
    this.displayDelete = true;
  }

  confirmDelete() {
  if (this.deleteIndex !== null) {
    this.store.dispatch(FormActions.deleteForm({ id: this.deleteIndex }));
    
    // Show toast
    this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Form deleted successfully!' });

    // Reset dialog state
    this.displayDelete = false;
    this.deleteIndex = null;
  }
}


  editForm(index: number) {
    this.router.navigate(['/forms'], { queryParams: { editId: index } });
  }

  goBack() {
    window.history.back();
  }
}
