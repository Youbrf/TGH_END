import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { RendezVous, Service } from 'src/app/models/model';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  dateSelectionnee!: NgbDateStruct;
  heuresDisponibles: string[] = [];
  reservation:RendezVous[]=[];
  isDisabled!:any;
  reserv: { heureDebut: string, heureFin: string }[] = [];
  availableHours: string[] = [];
  heureSelectionnee!: string;
  services!: Service[];
  interval:number=0;

  constructor(private route: ActivatedRoute,private rv : ReservationService, private calendar: NgbCalendar) {
    this.dateSelectionnee = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.services = JSON.parse(this.route.snapshot.queryParamMap.get('services') ?? '[]');
    this.isDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 7 || this.calendar.getWeekday(date) == 1;
    this.genererHeuresDisponibles();
  }
  selectionnerHeure(heure: string) {
    this.heureSelectionnee = heure;
  }

  genererHeuresDisponibles() {
    this.rv.searchRendezVous(this.dateSelectionnee).subscribe({
      next: data => {
        this.reservation = data;
        console.log(this.reservation);
  
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
    console.log(this.services);
    this.interval=0;
    this.services.forEach(e => {
      this.interval += e.duree;
    });
    console.log(this.interval);
    return this.interval;
  }
  
  
}
