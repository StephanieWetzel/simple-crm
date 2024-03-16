import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideRouter(routes),
      provideAnimationsAsync(),
      provideNativeDateAdapter(),
      importProvidersFrom(provideFirebaseApp(() => initializeApp({
        "projectId": "simple-crm-29b48",
        "appId": "1:857667417218:web:fceb40458e1fbdd913b09b",
        "storageBucket": "simple-crm-29b48.appspot.com",
        "apiKey": "AIzaSyCZdaVPOUafaEMbZlBQjoBliOqDvTkFXKg",
        "authDomain": "simple-crm-29b48.firebaseapp.com",
        "messagingSenderId": "857667417218"
      }))),
      importProvidersFrom(provideFirestore(() => getFirestore()))
    ]
};
