import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/_service/user/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService : UserService,private router:Router){}
  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      for (const user of users) {
        if (user.role === "USER") {
          this.users.push(user);
        }
      }
    });
  }

  deleteUser(idUser: number) {
    this.userService.deleteUser(idUser);
  }

  viewReservationHistory(user: any) {
    // Logique pour afficher l'historique des réservations de l'utilisateur
  }
}
