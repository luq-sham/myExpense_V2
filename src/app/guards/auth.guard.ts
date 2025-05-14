import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const hasToken = localStorage.getItem('token');

  if(hasToken){
    return true
  }else{
    router.navigate(['/login'])
  }
  return true;
};

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const hasToken = localStorage.getItem('token');

  if (hasToken) {
    // If already logged in, redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // Allow access to login page if not logged in
  return true;
};
