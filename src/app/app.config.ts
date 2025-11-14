import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [  //Supply only global providers for the standalone bootstrap.
    provideZoneChangeDetection({ eventCoalescing: true }), //It merges multiple similar DOM events into a single change detection cycle.
    provideRouter(routes),
  ]
};
