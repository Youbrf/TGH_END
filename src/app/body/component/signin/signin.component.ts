import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';
import { Signin } from 'src/app/models/model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loginForm!: FormGroup;
  submitted = false;
  signin: Signin={
    email:'',
    password:''
  };

  constructor(private formBuilder: FormBuilder,private router: Router, private auth: AuthentificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitLoginForm() {
    this.submitted = true;
    this.signin.email=this.loginForm.get('email')?.value;
    this.signin.password=this.loginForm.get('password')?.value;

    this.auth.authenticate(this.signin).subscribe(
      (reponse)=>{
        this.auth.saveTokenAndRole(reponse.access_token)
        alert('Bienvenue');
        if (this.auth.getRole() === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
        
      },
      (error)=>{
        if (error.status === 400 && error.error.errorMessage === 'Veuillez confirmer votre email avant de vous connecter.') {
          alert('Veuillez confirmer votre email avant de vous connecter.');
        } else {
          console.error('Erreur lors de la connexion :', error);
        }
      }
    );
    this.loginForm.reset();
    this.submitted = false;
  }
}
