import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LifecycleDemoComponent } from './shared/lifecycle-demo/lifecycle-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, LifecycleDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dynamic-form-app'); //Reactive state in Angular components
}
