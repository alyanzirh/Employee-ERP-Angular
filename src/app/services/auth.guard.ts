import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Check if the user is logged in
  const localUser = localStorage.getItem('empERPUser');
  if (localUser != null) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
