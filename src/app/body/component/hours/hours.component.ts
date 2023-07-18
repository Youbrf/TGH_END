import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { UserService } from 'src/app/core/_service/user/user.service';
import { Reservation, Service, User } from 'src/app/models/model';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  dateSelectionnee!: NgbDateStruct;
  reservation:Reservation[]=[];
  isDisabled!:any;
  availableHours: string[] = [];
  heureSelectionnee!: string;
  services!: Service[];
  interval:number=0;
  employeSelectionne!: number; 
  employes: User[] = [];
  newreservation: Reservation={
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
  serviceDurationA!: number;
  currentDate!:NgbDateStruct;

  constructor(private auth: AuthentificationService,private router: Router,private userS: UserService,private route: ActivatedRoute,private rv : ReservationService, private calendar: NgbCalendar) {
    this.dateSelectionnee = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.services = JSON.parse(this.route.snapshot.queryParamMap.get('services') ?? '[]');
    this.isDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 7
    this.dateSelectionnee = this.calendar.getToday();
    this.currentDate = { year: this.dateSelectionnee.year, month: this.dateSelectionnee.month, day: this.dateSelectionnee.day };
    this.userS.getAllUsers().subscribe(users => {
      for (const user of users) {
        if (user.role === "EMPLOYEE") {
          this.employes.push(user);
        }
      }
    });
    this.genererHeuresDisponibles();
  }
  selectionnerHeure(heure: string) {
    this.heureSelectionnee = heure;
  }

  genererHeuresDisponibles() {
    this.rv.searchReservation(this.dateSelectionnee,this.employeSelectionne).subscribe({
      next: data => {
        this.reservation = data;
        const openingTime = new Date().setHours(9, 0, 0);
        const closingTime = new Date().setHours(18, 0, 0);
        const closingTimeDate = new Date(closingTime);
  
        const availableHours: string[] = [];
        for (let time = openingTime; time < closingTime; time += 15 * 60 * 1000) {
          const hour = new Date(time).toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' });
          availableHours.push(hour);
        }
  
        const serviceDuration = this.calculateServiceDuration();
        const reservedRanges: { start: Date, end: Date }[] = [];
  
        this.reservation.forEach(reservation => {
          const reservedStart = new Date(`2023-06-13T${reservation.heureDebut}`);
          const reservedEnd = new Date(`2023-06-13T${reservation.heureFin}`);
          reservedRanges.push({ start: reservedStart, end: reservedEnd });
        });
  
        this.availableHours = availableHours.filter(hour => {
          const serviceStart = new Date(`2023-06-13T${hour}`);
          const serviceEnd = new Date(serviceStart.getTime() + (serviceDuration * 60 * 1000));
          if (serviceEnd.getHours() == closingTimeDate.getHours()) {
            if (serviceEnd.getMinutes() > closingTimeDate.getMinutes()) {
            return false;
            }
          }
          for (const reservedRange of reservedRanges) {
            if (
              (serviceStart >= reservedRange.start && serviceStart < reservedRange.end) ||
              (serviceEnd > reservedRange.start && serviceEnd <= reservedRange.end) ||
              (serviceStart <= reservedRange.start && serviceEnd >= reservedRange.end) 
            ) {
              return false;
            }
          }
          return true;
        });
      }
    });
  }
  
  calculateServiceDuration() {
    this.interval=0;
    this.services.forEach(e => {
      this.interval += e.duree;
    });
    return this.interval;
  }

  redirigerVersFormulaire(){
    let [h,m] = this.heureSelectionnee.split(":");
    const hours = parseInt(h);
    const minutes = parseInt(m);
    this.newreservation.dateReservation = new Date(this.dateSelectionnee.year,this.dateSelectionnee.month-1,this.dateSelectionnee.day,hours,minutes);
    this.newreservation.heureDebut = this.heureSelectionnee;
    function ajouterMinutesAHeure(heure: string, minutes: number): string {
      const [heures, minutesActuelles] = heure.split(":");
      const heuresActuelles = parseInt(heures);
      const minutesTotales = heuresActuelles * 60 + parseInt(minutesActuelles) + minutes;
      const nouvellesHeures = Math.floor(minutesTotales / 60) % 24;
      const nouvellesMinutes = minutesTotales % 60;
      return `${nouvellesHeures.toString().padStart(2, '0')}:${nouvellesMinutes.toString().padStart(2, '0')}`;
    }
    this.newreservation.heureFin = ajouterMinutesAHeure(this.newreservation.heureDebut,this.calculateServiceDuration())
    this.newreservation.services = this.services;
    for (const service of this.services) {
      this.newreservation.montantTotal += service.prix;
    }

    this.userS.getAllUsers().subscribe(users => {
      for (const user of users) {
        if (user.id == this.employeSelectionne) {
          this.newreservation.employer=user;
        }
        if (user.email === this.auth.getUsername()) {
          this.newreservation.user = user;
        }
      }
      this.router.navigate(['/reservation'], { queryParams: { reservation: JSON.stringify(this.newreservation), reload:true}});
    });
    
  }
}
