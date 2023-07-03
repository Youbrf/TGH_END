import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/model';

const API_URL = 'http://localhost:8080/api/Users';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private HTTP: HttpClient) { }

  getAllUsers(){
    return this.HTTP.get<User[]>(API_URL);
  }

  getUserById(userId: number) {
    return this.HTTP.get<User>(API_URL+"/"+userId);
  }
  updateUser(user: User) {
    return this.HTTP.put<User>(API_URL+"/"+user.id,user);
  }

}
