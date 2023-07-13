import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { sprintf } from 'sprintf-js';
import { Reservation, Service, User } from 'src/app/models/model';
import { AuthentificationService } from '../authentification/authentification.service';

const API_URL = 'http://localhost:8080/api/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private HTTP: HttpClient, private router:Router,private auth : AuthentificationService) { }

  getAllReservation(){
    return this.HTTP.get<Reservation[]>(API_URL+'RendezVous');
  }

  searchReservation(date: NgbDateStruct): Observable<Reservation[]> {
    const params = new HttpParams().set('date', `${date.year}-${sprintf('%02d', date.month)}-${sprintf('%02d', date.day)}`);
    return this.HTTP.get<Reservation[]>(API_URL+"RendezVous/search", { params });
  }
  
  
  getReservationByUser(idUser: number) {
    const params = new HttpParams().set('id',idUser);
    return this.HTTP.get<Reservation[]>(API_URL+'RendezVous/user',{ params });
  } 


  createReservation(reservation: Reservation) {
    this.HTTP.post<Reservation>(API_URL+"RendezVous",reservation, httpOptions).subscribe(
      () => {
        alert('La réservation a été enregistrée avec succès.');
        if (this.auth.getRole() === 'ADMIN') {
          this.router.navigate(['admin/reservations']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réservation :', error);
      }
    );
  }

  deleteReservation(id : number){
    this.HTTP.delete(API_URL+"RendezVous/"+id).subscribe(
      () => {
        alert('Réservation supprimé avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression de la réservation', error);
      }
    );
  }

  updateRendezVous(id: number, reservation: Reservation) {
    this.HTTP.put<Reservation>(API_URL+"RendezVous/"+id, reservation).subscribe(
      () => {
        alert('Réservation mis à jour avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la mis à jour de la réservation', error);
      }
    );
  }
  
}
