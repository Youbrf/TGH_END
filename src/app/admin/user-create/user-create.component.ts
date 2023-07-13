import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';
import { Register } from 'src/app/models/model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  information: Register={
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role:'',
  };
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth : AuthentificationService){};

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null; 
    } else {
      return { passwordMismatch: true };
    }
  }

  register() {
    if (this.registrationForm.invalid) {
      return alert('erreur , impossible de vous enregistrer');
    }
    this.information.firstname = this.registrationForm.get('firstname')?.value;
    this.information.lastname = this.registrationForm.get('lastname')?.value;
    this.information.email = this.registrationForm.get('email')?.value;
    this.information.password = this.registrationForm.get('password')?.value;
    this.information.role = this.registrationForm.get('role')?.value;
    this.auth.register(this.information);
    
  }

}
