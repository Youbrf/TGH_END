import { Component} from '@angular/core';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation } from 'src/app/models/model';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  reservations!: Reservation[]; 
  searchQuery!: string;

  constructor(private reservation: ReservationService) { }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservation.getAllReservation().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  searchReservations() {
  }

  sortReservations() {
  }

  deleteReservation(id: number) { 
    this.reservation.deleteReservation(id);
  }

  updateReservation() {
  }
}
