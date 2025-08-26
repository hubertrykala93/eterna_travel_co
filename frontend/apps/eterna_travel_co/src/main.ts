import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-console
bootstrapApplication(App, appConfig).catch((err: any) => console.error(err));
