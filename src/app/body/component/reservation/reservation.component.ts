import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation, Review, Service, User } from 'src/app/models/model';

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
    services: [],
    review: new Review()
  };

  constructor(
    private route: ActivatedRoute,
    private reservationService : ReservationService,
    private stripeService : StripeService,
    private router:Router,
    private auth : AuthentificationService) { }
  
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
    this.reservation.modePaiement = 'SUR PLACE';
    this.reservation.etatPaiement = "UNPAID";
    this.reservation.review = null;
    console.log(this.reservation);
    
    this.reservationService.createReservation(this.reservation).subscribe(
      reponse => {
        if (this.auth.getRole() === 'ADMIN') {
          alert('La réservation a été enregistrée avec succès.');
          this.router.navigate(['admin/reservations']);
        } else {
          this.router.navigate(['/success'], { queryParams: { reservationplace: JSON.stringify(reponse.id) } });
        }
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réservation :', error);
      }
    );
  }

  PayerEnLigne() {
    console.log(this.reservation);
    this.reservation.etatPaiement = "UNPAID";
    this.reservation.statutReservation = "PENDING";
    this.reservation.modePaiement = "SUR PLACE";
    this.reservation.review = null;
    this.reservationService.createReservation(this.reservation).subscribe(
      reponse =>{
        this.reservationService.createCheckoutSession(reponse)
      .pipe(
        switchMap(session =>{
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
    );
  }

}
