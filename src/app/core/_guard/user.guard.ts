import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../_service/authentification/authentification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class userGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getRole() === 'USER') {
      return true;
    }
    this.router.navigate(['/authentification']);
    return false;
  }
}
