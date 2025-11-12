import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private storageKey = 'dynamicForms';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  addFormData(data: any) {
    const existing = this.getAllForms();
    existing.push(data);
    localStorage.setItem(this.storageKey, JSON.stringify(existing));
  }

  getAllForms() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getFormById(id: number) {
    const all = this.getAllForms();
    return all[id];
  }

  /** 🗑 Delete form by its index */
  deleteForm(id: number) {
    const all = this.getAllForms();
    all.splice(id, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }

  /** ✏️ Update an existing form by id */
  updateForm(id: number, updatedForm: any) {
    const all = this.getAllForms();
    all[id] = updatedForm;
    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }
}
