import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation, Service, User } from 'src/app/models/model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  services!: Service[];
  duree:number=0;
  reservation: Reservation = {
    id: 0,
    dateReservation: new Date(),
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
    user: new User(),
    employer: new User(),
    services: []
  };

  constructor(
    private route: ActivatedRoute,
    private reservationService : ReservationService,
    private stripeService : StripeService) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['reload']) {
        this.reloadOnInit();
      }
    });
    this.initializeData();
  }

  reloadOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.services = JSON.parse(this.route.snapshot.queryParamMap.get('services') ?? '[]');
    this.reservation = JSON.parse(this.route.snapshot.queryParamMap.get('reservation') ?? '[]');
    this.calculateServiceDuration(this.reservation);
  }
  
  calculateServiceDuration(res:Reservation) {
    this.duree=0;
    if (res.services) {
      res.services.forEach(e => {
      this.duree += e.duree;
    });
    }
    
    return this.duree;
  }

  PayerSurPlace() {
    this.reservation.modePaiement = 'Sur place';
    this.reservationService.createReservation(this.reservation);
  }

  PayerEnLigne() {
    console.log(this.reservation);
    
    this.reservationService.createCheckoutSession(this.reservation)
      .pipe(
        switchMap(session =>{
          console.log(session.sessionId);
          return this.stripeService.redirectToCheckout({sessionId: session.sessionId})
        })
      )
      .subscribe(result=>{
        if (result.error) {
          alert(result.error.message);
          console.log("alert error");
        }
      })
  }

}
