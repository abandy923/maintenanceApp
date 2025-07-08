import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}).then(() => {
  // ✅ Set persistence *after* bootstrapping
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence).catch((err) =>
    console.error('Auth persistence setup failed:', err)
  );
});







