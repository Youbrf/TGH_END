import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './core/_service/authentification/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tgh_end';
  isAdmin: boolean = false;
  constructor(private auth: AuthentificationService) {}

  isAdminUser(): boolean { 
    if (this.auth.getRole()==='ADMIN') {
      this.isAdmin = true; 
    }
    return this.isAdmin;
  }
}
