import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

  const API_URL = 'http://tgh-api-env.eba-p2iwtqga.eu-west-3.elasticbeanstalk.com/api/statistiques';
@Injectable({
  providedIn: 'root'
})

export class StatistiquesService {

  constructor(private HTTP: HttpClient) { }

  getTotalReservations(): Observable<number> {
    return this.HTTP.get<number>(API_URL+"/totalReservations");
  }

  getAverageReservationDuration(): Observable<number> {
    return this.HTTP.get<number>(API_URL+"/averageReservationDuration");
  }

  getReservationsByDay(): Observable<Map<string, number>> {
    return this.HTTP.get<Map<string, number>>(API_URL+"/reservationsByDay");
  }

  getReservationsByWeek(): Observable<Map<number, number>> {
    return this.HTTP.get<Map<number, number>>(API_URL+"/reservationsByWeek");
  }

  getReservationsByMonth(): Observable<Map<number, number>> {
    return this.HTTP.get<Map<number, number>>(API_URL+"/reservationsByMonth");
  }

  getReservationStatus(): Observable<Map<string, number>> {
    return this.HTTP.get<Map<string, number>>(API_URL+"/reservationStatus");
  }

  getMostDemandedServices(): Observable<Map<string, number>> {
    return this.HTTP.get<Map<string, number>>(API_URL+"/mostDemandedServices");
  }

  getMostRequestedEmployees(): Observable<Map<string, number>> {
    return this.HTTP.get<Map<string, number>>(API_URL+"/mostRequestedEmployees");
  }

  getBookingOccupancyRate(): Observable<number> {
    return this.HTTP.get<number>(API_URL+"/bookingOccupancyRate");
  }
  /*
  getReservationConversionRate(): Observable<number> {
    return this.HTTP.get<number>(API_URL+"/reservationConversionRate");
  }

  getCustomerCommentsAndReviews(): Observable<Commentaire[]> {
    return this.HTTP.get<Commentaire[]>(API_URL+"/customerCommentsAndReviews");
  }*/

  getTotalRevenueFromBookings(): Observable<number> {
    return this.HTTP.get<number>(API_URL+"/totalRevenueFromBookings");
  }
}
