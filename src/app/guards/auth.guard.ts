import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, resolve);
  });

  if (user) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};






