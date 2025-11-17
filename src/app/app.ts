import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';       // <-- Add this
import { ReactiveFormsModule } from '@angular/forms';
import { LifecycleDemoComponent } from './shared/lifecycle-demo/lifecycle-demo';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,            // <-- Add this
    RouterOutlet,
    ReactiveFormsModule,
    LifecycleDemoComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('dynamic-form-app');

  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  isDashboardPage(): boolean {
    return this.currentRoute === '/dashboard';
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
