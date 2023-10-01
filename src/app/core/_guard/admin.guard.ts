import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from '../_service/authentification/authentification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getRole() === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}