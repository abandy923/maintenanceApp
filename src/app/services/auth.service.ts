import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

const firebaseConfig = {
    apiKey: "AIzaSyBWeyC7cSioYUjloRopLNirGLNwzG8NB2M",
    authDomain: "maintenanceapp-4b229.firebaseapp.com",
    projectId: "maintenanceapp-4b229",
    storageBucket: "maintenanceapp-4b229.appspot.com",
    messagingSenderId: "353080055845",
    appId: "1:353080055845:web:a59e3010cb1a1e536407cc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(auth, (user) => this.user$.next(user));
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }

  get currentUser(): User | null {
    return auth.currentUser;
  }

  get currentUid(): string | null {
    return auth.currentUser?.uid ?? null;
  }
}



