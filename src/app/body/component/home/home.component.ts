import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private auth: AuthentificationService, private router:Router){}

  ngOnInit(): void {
    if (this.auth.getRole() === 'ADMIN') {
      this.router.navigate(['/admin/dashboard'])
    };
  }

}
