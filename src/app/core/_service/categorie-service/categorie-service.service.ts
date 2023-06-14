import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/models/model';
import { Service } from 'src/app/models/model';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {
  

  constructor(private HTTP: HttpClient) { }
  
  getAllCategories(): Observable<Categorie[]> {
    return this.HTTP.get<Categorie[]>(API_URL+'CategorieServices');
  }
  getServicesByCategorie(idCategorie: number): Observable<Service[]> {
    return this.HTTP.get<Service[]>(API_URL+"Services/categorie/"+idCategorie);
  }
}
