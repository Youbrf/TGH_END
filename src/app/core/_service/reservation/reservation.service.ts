import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { sprintf } from 'sprintf-js';
import { RendezVous } from 'src/app/models/model';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private HTTP: HttpClient) { }

  searchRendezVous(date: NgbDateStruct): Observable<RendezVous[]> {
    const params = new HttpParams().set('date', `${date.year}-${sprintf('%02d', date.month)}-${sprintf('%02d', date.day)}`);
    return this.HTTP.get<RendezVous[]>(API_URL+"RendezVous/search", { params });
  }
  
  
}
