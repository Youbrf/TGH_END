import { Component, OnInit } from '@angular/core';
import { StatistiquesService } from 'src/app/core/_service/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit{
  totalReservations!: number;
  averageReservationDuration!: number;
  reservationsByDay!: Map<string, number>;
  reservationsByWeek!: Map<number, number>;
  reservationsByMonth!: Map<number, number>;
  reservationStatus!: Map<string, number>;
  mostDemandedServices!: Map<string, number>;
  mostRequestedEmployees!: Map<string, number>;
  bookingOccupancyRate!: number;
  /*
  reservationConversionRate!: number;
  customerCommentsAndReviews!: Commentaire[];
  */
  totalRevenueFromBookings!: number;
  
  constructor(private statistiqueService: StatistiquesService) { }

  ngOnInit(): void {
    this.getTotalReservations();
    this.getAverageReservationDuration();
    this.getReservationsByDay();
    this.getReservationsByWeek();
    this.getReservationsByMonth();
    this.getReservationStatus();
    this.getMostDemandedServices();
    this.getMostRequestedEmployees();
    this.getBookingOccupancyRate();
    /*
    this.getReservationConversionRate();
    this.getCustomerCommentsAndReviews();
    */
    this.getTotalRevenueFromBookings();
  }

  getTotalReservations(): void {
    this.statistiqueService.getTotalReservations()
      .subscribe(total => this.totalReservations = total);
  }

  getAverageReservationDuration(): void {
    this.statistiqueService.getAverageReservationDuration()
      .subscribe(average => this.averageReservationDuration = average);
  }

  getReservationsByDay(): void {
    this.statistiqueService.getReservationsByDay()
      .subscribe(reservations => this.reservationsByDay = reservations);
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

  /*
  getReservationConversionRate(): void {
    this.statistiqueService.getReservationConversionRate()
      .subscribe(rate => this.reservationConversionRate = rate);
  }

  getCustomerCommentsAndReviews(): void {
    this.statistiqueService.getCustomerCommentsAndReviews()
      .subscribe(comments => this.customerCommentsAndReviews = comments);
  }*/

  getTotalRevenueFromBookings(): void {
    this.statistiqueService.getTotalRevenueFromBookings()
      .subscribe(revenue => this.totalRevenueFromBookings = revenue);
  }

}
