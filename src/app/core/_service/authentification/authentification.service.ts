import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Register, Signin } from 'src/app/models/model';

const API_URL = 'http://localhost:8080/api/auth/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private HTTP: HttpClient, private router:Router) { }

  register(register:Register){
    this.HTTP.post<Register>(API_URL+"register",register,httpOptions).subscribe(
      () => {
        alert('L\'inscription a été enregistrée avec succès.');
        if (this.getRole()==='ADMIN') {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }

  authenticate(signin: Signin): Observable<any>{
    return this.HTTP.post<Signin>(API_URL+'authenticate',signin,httpOptions);
  }

  saveTokenAndRole(token: string): void {
    localStorage.setItem('accessToken', token);
    const decodedToken:any = jwtDecode(token);
    localStorage.setItem('role', decodedToken.roles);
    localStorage.setItem('username', decodedToken.sub);
  }

  getToken(): string | null{
    return localStorage.getItem('accessToken');
  }

  getRole(): string | null{
    return localStorage.getItem('role');
  }

  getUsername(): string | null{
    return localStorage.getItem('username');
  }

  clearTokenAndRole(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username')
  }

}
