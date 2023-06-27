import { Component } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  showRegister: boolean = false;

  toggleView(): void {
    this.showRegister = !this.showRegister;
  }
}
