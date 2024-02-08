import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.getToken()) {
    return true;
  } else {
    router.navigate(['/landing']);
    console.log('Unauthorized')
    return true;
  }
};
