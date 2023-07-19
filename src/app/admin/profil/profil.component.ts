import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/_service/user/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  user: User = new User();

  constructor(private userS: UserService){}

  ngOnInit(): void {
    this.userS.getAllUsers().subscribe(users=>{
      for (const user of users) {
        if (user.email === localStorage.getItem('username')) {
          this.user = user;
        }
      }
    })
  }


}
