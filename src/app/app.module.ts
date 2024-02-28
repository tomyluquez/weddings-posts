import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS, localStorageSyncReducer } from './state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import { environment } from './environments/environment.development';
import { connectAuthEmulator } from '@firebase/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, withViewTransitions, Routes } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers: [localStorageSyncReducer],
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators && isDevMode()) {
        // Solo en modo de desarrollo
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideFirestore(() => {
      let firestore: Firestore;
      if (environment.useEmulators && isDevMode()) {
        // Solo en modo de desarrollo
        firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: true,
        });
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      } else {
        firestore = getFirestore();
      }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators && isDevMode()) {
        // Solo en modo de desarrollo
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
  ],
  providers: [provideRouter(routes, withViewTransitions())],
  bootstrap: [AppComponent],
})
export class AppModule {}
