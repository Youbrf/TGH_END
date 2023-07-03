import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private auth: AuthentificationService){}

  logout(){
    this.auth.clearTokenAndRole();
  }

}
