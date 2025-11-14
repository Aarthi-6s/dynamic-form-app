import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


//platformBrowserDynamic() or bootstrapApplication() is used to bootstrap Angular applications, providers and pass the appConfig.
