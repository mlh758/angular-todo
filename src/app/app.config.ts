import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { DATABASE_NAME } from './services/storage.service';
import { provideUserSignal } from './providers/user-signal.provider';
/**
 * You can provide app wide dependencies here for the DI system, not
 * just Angular framework options.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideUserSignal(),
    { provide: DATABASE_NAME, useValue: 'ssr-example' },
  ],
};
