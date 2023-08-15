import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';
import { UserService } from 'src/app/core/_service/user/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  token!:string | null;
  user = new User;
  resetPasswordForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private userS: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router : Router){}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token != null) {
      this.userS.getUserByToken(this.token).subscribe(
        (reponse)=>{
          this.user = reponse;
        },
        (error)=>{
          console.error('Erreur lors de la connexion :', error);
        }
      );
    }
  }

  submitResetPasswordForm(){
    this.user.password = this.resetPasswordForm.controls['confirmPassword'].value;
    this.userS.updateUser(this.user).subscribe(
      (reponse)=>{
        alert("Réinitialisation du mot de passe effectuée avec succès.");
        this.router.navigate(['/home']);
      },
      (error)=>{
        console.error('Error lors de la réinitialisation du mot de passe : ', error);
      }
    )
    
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.controls['password'].value;
    const confirmPassword = formGroup.controls['confirmPassword'].value;
    
    if (password === confirmPassword) {
      formGroup.controls['confirmPassword'].setErrors(null);
    } else {
      formGroup.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
