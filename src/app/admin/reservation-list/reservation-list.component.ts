import { Component, TemplateRef } from '@angular/core';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation } from 'src/app/models/model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  reservations!: Reservation[]; 
  searchQuery!: string;
  modalRef!: BsModalRef;

  constructor(private reservation: ReservationService, private modalService: BsModalService) { }

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
