import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation } from 'src/app/models/model';

@Component({
  selector: 'app-history-reservation-user',
  templateUrl: './history-reservation-user.component.html',
  styleUrls: ['./history-reservation-user.component.css']
})
export class HistoryReservationUserComponent implements OnInit{
  reservations!: Reservation[];
  idUser!: number;

  constructor(private reservationS: ReservationService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.idUser = +this.route.snapshot.params['id'];
    console.log(this.idUser);
    
    this.loadReservation();
  }

  loadReservation() {
    this.reservationS.getReservationByUser(this.idUser).subscribe(
      (reservations) => {
        this.reservations = reservations;
      },
      error => {
        console.error('Erreur :', error);
      }
    );
  }
  


}
