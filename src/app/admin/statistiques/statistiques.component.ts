import { Component, OnInit } from '@angular/core';
import { StatistiquesService } from 'src/app/core/_service/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  cardColor: string = '#FF5733';
  chartData: any[] = [];
  totalReservations!: any[];
  averageReservationDuration!: number;
  reservationsByDay: Map<string, number> = new Map<string,number>();
  reservationsByWeek!: any[];
  reservationsByMonth!: any[];
  reservationStatus!: any[];
  mostDemandedServices!: Map<string, number>;
  mostRequestedEmployees!: Map<string, number>;
  bookingOccupancyRate!: number;
  totalRevenueFromBookings!: any[];
  startDate!: Date;
  endDate!: Date;


  constructor(private statistiqueService: StatistiquesService) { }

  ngOnInit(): void {
    this.setDefaultDateRange();
    this.getChartData();
    this.filterDataByDateRange();
    this.getTotalReservations();
    this.getReservationsByWeek();
    this.getReservationsByMonth();
    this.getReservationStatus();
    this.getMostDemandedServices();
    this.getMostRequestedEmployees();
    this.getBookingOccupancyRate();
    this.getTotalRevenueFromBookings();
    
  }

  setDefaultDateRange(): void {
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 30);
  }

  filterDataByDateRange(): void {
    if (this.startDate && this.endDate) {
      this.chartData = Array.from(this.reservationsByDay.entries())
        .filter(([name, value]) => {
          const date = new Date(name);
          const startDate = new Date(this.startDate);
          const endDate = new Date(this.endDate);
          return date >= startDate && date <= endDate;
        })
        .sort(([nameA, valueA], [nameB, valueB]) => {
          const dateA = new Date(nameA);
          const dateB = new Date(nameB);
          return dateA.getTime() - dateB.getTime();
        })
        .map(([name, value]) => ({ name, value }));
    }
  }
  
  onDateRangeChange(): void {
    this.filterDataByDateRange();
  }
  
  getChartData(): void {
    this.statistiqueService.getReservationsByDay()
      .subscribe(reservations => {
        this.reservationsByDay = new Map(Object.entries(reservations));
        if (this.reservationsByDay && this.reservationsByDay.size > 0) {
          this.filterDataByDateRange();
        }
      });
  }
  

  getTotalReservations(): void {
    this.statistiqueService.getTotalReservations()
      .subscribe(total => {
        this.totalReservations = [{
          name: "Réservations",
          value: total
        }];
      });
  }
  

  getReservationsByWeek(): void {
    this.statistiqueService.getReservationsByWeek()
      .subscribe(reservations => {
        this.reservationsByWeek = Object.entries(reservations).map(([key, value]) => ({
          name: key,
          value: value
        }));
      });
  }
  

  getReservationsByMonth(): void {
    this.statistiqueService.getReservationsByMonth()
      .subscribe(reservations => {
        this.reservationsByMonth = Object.entries(reservations).map(([key, value]) => ({
          name: key,
          value: value
        }));});
  }

  getReservationStatus(): void {
    this.statistiqueService.getReservationStatus()
      .subscribe(status => {this.reservationStatus = Object.entries(status).map(([key, value]) => ({
        name: key,
        value: value
      }));});
  }

  getMostDemandedServices(): void {
    this.statistiqueService.getMostDemandedServices()
      .subscribe(services => this.mostDemandedServices = services);
  }

  getMostRequestedEmployees(): void {
    this.statistiqueService.getMostRequestedEmployees()
      .subscribe(employees => this.mostRequestedEmployees = employees);
  }

  getBookingOccupancyRate(): void {
    this.statistiqueService.getBookingOccupancyRate()
      .subscribe(rate => this.bookingOccupancyRate = rate);
  }

  getTotalRevenueFromBookings(): void {
    this.statistiqueService.getTotalRevenueFromBookings()
      .subscribe(revenue => {
        this.totalRevenueFromBookings = [{
          name: "Revenus",
          value: revenue
        }];
      });
  }
}