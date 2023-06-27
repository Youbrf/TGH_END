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
      },
      (error)=>{
        alert('Erreur lors de la connection');
      }
    );

    this.loginForm.reset();
    this.submitted = false;
  }
}
