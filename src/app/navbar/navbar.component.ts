import { Component } from '@angular/core';
import { AuthentificationService } from '../core/_service/authentification/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  connecter:boolean = false;

  constructor(private auth: AuthentificationService){}

  isConnecter(): boolean{
    if (this.auth.getToken()) {
      this.connecter=true;
    }
    return this.connecter;
  }

  logout(){
    this.auth.clearTokenAndRole();
  }

}
