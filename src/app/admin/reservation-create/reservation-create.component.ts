import { Component, OnInit } from '@angular/core';
import { CategorieServiceService } from 'src/app/core/_service/categorie-service/categorie-service.service';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { UserService } from 'src/app/core/_service/user/user.service';
import { CategorieService, Reservation, Review, Service, User } from 'src/app/models/model';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
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
    user: new User(),
    employer: new User(),
    services:[new Service],
    review: new Review
  };
  employers: User[] = [];
  users: User[] = [];
  categories!: CategorieService[];
  services!: Service[];
  servicesByCategorie: { [idCategorie: number]: Service[] } = {};
  selectedService!: Service[];
  selectedServiceId!: number;
  selectedCategorie: CategorieService = new CategorieService;

  constructor(private reservationService: ReservationService, private userService: UserService, private serviceService: CategorieServiceService) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users =>{
      for (const user of users) {
        if (user.role === 'USER') {
          this.users.push(user);
        }
        if (user.role === 'EMPLOYEE') {
          this.employers.push(user);
        }
      }
    });
    this.serviceService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      for (const categorie of categories) {
        this.loadServices(categorie);
      }
    });
  }
  loadServices(categorie: CategorieService): void {
    this.serviceService.getServicesByCategorie(categorie.id).subscribe(services => {
      this.servicesByCategorie[categorie.id] = services;
    });
  }

  selectCategorie(categorie: any): void {
    this.services = this.servicesByCategorie[categorie.id];
  }

  onSubmit() {
    for (const service of this.reservation.services) {
      this.selectedServiceId = parseInt(this.reservation.services.toString());
    }
    console.log(this.selectedServiceId);
    
    
    this.reservation.services = []
    this.serviceService.getServiceById(this.selectedServiceId).subscribe(service=>{
      this.reservation.services.push(service);
    });

    this.userService.getUserById(this.reservation.user.id).subscribe(user=>{
      this.reservation.user = user;
    });
    this.userService.getUserById(this.reservation.employer.id).subscribe(user=>{
      this.reservation.employer = user;
    })
    
    console.log(this.reservation);
    this.reservationService.createReservation(this.reservation);
  }
}
