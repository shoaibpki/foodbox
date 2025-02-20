// import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from './services/user.service';

// @Injectable({
//   providedIn: 'root'
// })

export const AuthGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);

  if (userService.getIsLogin() == true)
    return true;
  else {
    return false;
  }
};
  

