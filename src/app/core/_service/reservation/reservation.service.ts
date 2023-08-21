import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { sprintf } from 'sprintf-js';
import { Reservation, Service, StripeResponse, User } from 'src/app/models/model';

const API_URL = 'http://tgh-api-env.eba-p2iwtqga.eu-west-3.elasticbeanstalk.com/api/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private HTTP: HttpClient) { }

  createCheckoutSession(reservation: Reservation): Observable<StripeResponse>{
    return this.HTTP.post<StripeResponse>(API_URL+'Reservation/create-checkout-session',reservation,httpOptions);
  }

  getAllReservation(){
    return this.HTTP.get<Reservation[]>(API_URL+'Reservation');
  }

  searchReservation(date: NgbDateStruct,idEmploye :number): Observable<Reservation[]> {
    const params = new HttpParams().set('date', `${date.year}-${sprintf('%02d', date.month)}-${sprintf('%02d', date.day)}`);
    return this.HTTP.get<Reservation[]>(API_URL+"Reservation/search/"+idEmploye, { params });
  }
  
  
  getReservationByUser(idUser: number) {
    const params = new HttpParams().set('id',idUser);
    return this.HTTP.get<Reservation[]>(API_URL+'Reservation/user',{ params });
  }

  getReservationById(id:number){
    return this.HTTP.get<Reservation>(API_URL+'Reservation/'+id);
  }


  createReservation(reservation: Reservation) : Observable<any> {
    return this.HTTP.post<Reservation>(API_URL+"Reservation",reservation, httpOptions);
  }

  deleteReservation(id : number){
    this.HTTP.delete(API_URL+"Reservation/"+id).subscribe(
      () => {
        alert('Réservation supprimé avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression de la réservation', error);
      }
    );
  }

  updateReservation(id: number, reservation: Reservation) : Observable<any> {
    return this.HTTP.put<Reservation>(API_URL + "Reservation/" + id, reservation);
  }

  updateReservationById(id: number) : Observable<any> {
    return this.HTTP.put(API_URL + "Reservation/updated/" + id, null);
  }
  
}
