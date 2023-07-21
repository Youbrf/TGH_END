import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private auth: AuthentificationService,private router : Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink();
      }
    });
    this.updateActiveLink();
  }
  
  updateActiveLink(): void {
    const activeLink = this.router.url;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('routerLink') === activeLink) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  logout(){
    this.auth.clearTokenAndRole();
  }

}
