import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { from, map, take } from 'rxjs';
import { user } from 'rxfire/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return from(user(auth)).pipe(
    take(1),
    map((currentUser) => {
      if (currentUser) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};









