import { Component, OnInit } from '@angular/core';
import { StatistiquesService } from 'src/app/core/_service/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  chartData: any[] = [];
  totalReservations!: number;
  averageReservationDuration!: number;
  reservationsByDay!: Map<string, number>;
  reservationsByWeek!: Map<number, number>;
  reservationsByMonth!: Map<number, number>;
  reservationStatus!: Map<string, number>;
  mostDemandedServices!: Map<string, number>;
  mostRequestedEmployees!: Map<string, number>;
  bookingOccupancyRate!: number;
  totalRevenueFromBookings!: number;
  startDate!: Date;
  endDate!: Date;


  constructor(private statistiqueService: StatistiquesService) { }

  ngOnInit(): void {
    this.getChartData();
    this.filterDataByDateRange();
    this.getTotalReservations();
    this.getAverageReservationDuration();
    this.getReservationsByWeek();
    this.getReservationsByMonth();
    this.getReservationStatus();
    this.getMostDemandedServices();
    this.getMostRequestedEmployees();
    this.getBookingOccupancyRate();
    this.getTotalRevenueFromBookings();
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
        .map(([name, value]) => ({ name, value }));
    }
  }
  
  onDateRangeChange(): void {
    this.filterDataByDateRange();
  }
  
  getChartData(): void {
    this.statistiqueService.getReservationsByDay()
      .subscribe(reservations => {
        console.log(reservations);
        
        this.reservationsByDay = new Map(Object.entries(reservations));
        if (this.reservationsByDay && this.reservationsByDay.size > 0) {
          this.chartData = Array.from(this.reservationsByDay.entries()).map(([name, value]) => ({ name, value }));
        }
      });
  }
  

  getTotalReservations(): void {
    this.statistiqueService.getTotalReservations()
      .subscribe(total => this.totalReservations = total);
  }

  getAverageReservationDuration(): void {
    this.statistiqueService.getAverageReservationDuration()
      .subscribe(average => this.averageReservationDuration = average);
  }

  getReservationsByWeek(): void {
    this.statistiqueService.getReservationsByWeek()
      .subscribe(reservations => this.reservationsByWeek = reservations);
  }

  getReservationsByMonth(): void {
    this.statistiqueService.getReservationsByMonth()
      .subscribe(reservations => this.reservationsByMonth = reservations);
  }

  getReservationStatus(): void {
    this.statistiqueService.getReservationStatus()
      .subscribe(status => this.reservationStatus = status);
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
      .subscribe(revenue => this.totalRevenueFromBookings = revenue);
  }
}