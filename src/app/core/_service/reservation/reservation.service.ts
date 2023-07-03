import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { sprintf } from 'sprintf-js';
import { Reservation, Service } from 'src/app/models/model';

const API_URL = 'http://localhost:8080/api/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private HTTP: HttpClient, private router:Router) { }

  getAllReservation(){
    return this.HTTP.get<Reservation[]>(API_URL+'RendezVous');
  }

  searchReservation(date: NgbDateStruct): Observable<Reservation[]> {
    const params = new HttpParams().set('date', `${date.year}-${sprintf('%02d', date.month)}-${sprintf('%02d', date.day)}`);
    return this.HTTP.get<Reservation[]>(API_URL+"RendezVous/search", { params });
  }

  createReservation(reservation: Reservation) {
    this.HTTP.post<Reservation>(API_URL+"RendezVous",reservation, httpOptions).subscribe(
      () => {
        alert('La réservation a été enregistrée avec succès.');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réservation :', error);
      }
    );
  }

  deleteReservation(id : number){
    this.HTTP.delete(API_URL+"RendezVous/"+id).subscribe(
      () => {
        alert('RendezVous supprimé avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression du RendezVous', error);
      }
    );
  }

  updateRendezVous(id: number, reservation: Reservation) {
    this.HTTP.put<Reservation>(API_URL+id, reservation);
  }
  
}
