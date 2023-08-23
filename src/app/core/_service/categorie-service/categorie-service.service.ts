import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/models/model';
import { Service } from 'src/app/models/model';

const API_URL = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {
  

  constructor(private HTTP: HttpClient,private router: Router) { }
  //controleur categorie
  getAllCategories(): Observable<CategorieService[]> {
    return this.HTTP.get<CategorieService[]>(API_URL+'CategorieServices');
  }
  getServicesByCategorie(idCategorie: number): Observable<Service[]> {
    return this.HTTP.get<Service[]>(API_URL+"Services/categorie/"+idCategorie);
  }
  createCategorieService(categorie: CategorieService){
    this.HTTP.post(API_URL+'CategorieServices',categorie,httpOptions).subscribe(
      () => {
        alert('La catégorie a été enregistré avec succès.');
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la catégorie :', error);
      }
    );
  }

  updateCategorieService(categorie:CategorieService){
    this.HTTP.put(API_URL+'CategorieServices/'+categorie.id,categorie).subscribe(
      () => {
        alert('Catégorie mis à jour avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la mis à jour de la categorie', error);
      }
    );
  }
  deleteCategorieService(idCategorie: number){
    this.HTTP.delete(API_URL+'CategorieServices/'+idCategorie).subscribe(
      () => {
        alert('Catégorie supprimé avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression de la categorie', error);
      }
    );
  }
  // controleur service
  getServiceById(idService: number): Observable<Service> {
    return this.HTTP.get<Service>(API_URL+"Services/"+idService);
  }

  getAllServices(): Observable<Service[]> {
    return this.HTTP.get<Service[]>(API_URL+'Services');
  }

  updateService(service: Service){
    this.HTTP.put(API_URL+'Services/'+service.id,service).subscribe(
      () => {
        alert('Service mis à jour avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la mis à jour du service', error);
      }
    );
  }
  deleteService(idService: number){
    this.HTTP.delete(API_URL+'Services/'+idService).subscribe(
      () => {
        alert('Service supprimé avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression du service', error);
      }
    );
  }

  createService(service: Service){
    this.HTTP.post(API_URL+'Services',service,httpOptions).subscribe(
      () => {
        alert('Le service a été enregistré avec succès.');
          this.router.navigate(['/admin/services']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du service :', error);
      }
    );
  }
}
