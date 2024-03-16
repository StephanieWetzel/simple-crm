import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideRouter(routes), provideAnimationsAsync(),
      provideNativeDateAdapter(),
      importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),
      importProvidersFrom(provideFirestore(() => getFirestore()))
    ]
};
