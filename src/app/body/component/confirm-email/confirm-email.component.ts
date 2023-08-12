import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit{
  token!:string | null;

  constructor(
    private auth: AuthentificationService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log(this.token);
    
    if (this.token != null) {
      this.auth.confirmEmail(this.token).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

}
