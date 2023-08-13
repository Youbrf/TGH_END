import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  resetPasswordForm = new FormGroup({
    resetEmail: new FormControl ('',[Validators.required,Validators.email])
  });
  signin: Signin={
    email:'',
    password:''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private auth: AuthentificationService,
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitLoginForm() {
    this.signin.email=this.loginForm.get('email')?.value;
    this.signin.password=this.loginForm.get('password')?.value;

    this.auth.authenticate(this.signin).subscribe(
      (reponse)=>{
        this.auth.saveTokenAndRole(reponse.access_token)
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
  }

  submitResetPasswordForm(){
    const resetEmail = this.resetPasswordForm.controls.resetEmail.value;
    if (resetEmail!=null) {
      this.auth.sendResetPasswordRequest(resetEmail).subscribe(
        (reponse)=>{
          alert(reponse.errorMessage);          
        },
        (error)=>{
          console.error('Erreur lors de la connexion :', error);
        }
      );
    }
    
    this.resetPasswordForm.reset();
  }
}
