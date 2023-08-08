import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation, User } from 'src/app/models/model';


@Component({
  selector: 'app-recapitulatif-reservation',
  templateUrl: './recapitulatif-reservation.component.html',
  styleUrls: ['./recapitulatif-reservation.component.css']
})
export class RecapitulatifReservationComponent implements OnInit{

  reservation: Reservation = {
    id: 0,
    dateReservation: new Date,
    heureDebut: '',
    heureFin: '',
    remarquesSpeciales: '',
    statutReservation: '',
    montantTotal: 0,
    modePaiement: '',
    dateCreation: '',
    dateModification: '',
    dateAnnulation: '',
    etatPaiement: '',
    user: new User,
    employer: new User,
    services: []
  };
  idReservation! : number;
  idReservationplace! : number;

  constructor(
    private route : ActivatedRoute,
    private reservationService: ReservationService
  ){}

  ngOnInit(): void {
    const reservationParam = this.route.snapshot.queryParamMap.get('reservation');
    const reservationPlaceParam = this.route.snapshot.queryParamMap.get('reservationplace');
  
    if (reservationParam !== null) {
      this.idReservation = JSON.parse(reservationParam);
      this.getReservationById(this.idReservation);
    } 
  
    if (reservationPlaceParam !== null) {
      this.idReservationplace = JSON.parse(reservationPlaceParam);
      this.reservationService.getReservationById(this.idReservationplace).subscribe(reponse => {
        reponse.heureDebut = this.formatHeure(reponse.heureDebut);
        this.reservation = reponse;
      });
    } 
  }
  
  
  getReservationById(id : number){
    this.reservationService.updateReservationById(id).subscribe(
      () => {
        console.log('Réservation mis à jour avec succès');
        this.reservationService.getReservationById(id).subscribe(reponse=>{
          reponse.heureDebut = this.formatHeure(reponse.heureDebut);
          this.reservation = reponse;
        });
        console.log(this.reservation);
      },
      error => {
        console.error('Erreur lors de la mis à jour de la réservation', error);
      }
    );
    
  }
  formatHeure(heure: string): string {
    const partiesHeure = heure.split(":");    
    return partiesHeure[0] + ":" + partiesHeure[1];
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any): void {
    const customURL = '/home';
    window.location.href = customURL;
  }

}
