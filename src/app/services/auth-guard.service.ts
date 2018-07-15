import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
     private authService: AuthService
  ) { }

  canActivate() {
    if ( this.authService.isLoggedIn() ) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
}
}
