import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/_service/user/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  user: User = new User;
  userId!: number;
  showPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.params['id']; 
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error) => {
          console.log('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur :', error);
        }
      );
    }
  }

  updateUser() {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(
        (updatedUser: User) => {
          console.log('Utilisateur mis à jour avec succès :', updatedUser);
          alert('Utilisateur mis à jour avec succès');
          this.router.navigate(['/admin/users', this.user.id]);
        },
        (error) => {
          console.log('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur :', error);
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    console.log(this.user);
    
  }
}
