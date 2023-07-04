import { Component} from '@angular/core';
import { ModalDismissReasons, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { Reservation, User } from 'src/app/models/model';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  dateSelectionnee!: NgbDateStruct;
  reservations!: Reservation[];
  searchQuery!: string;
  closeResult = '';
  reservationToUpdate: Reservation = new Reservation();

  constructor(private reservationService: ReservationService,private modalService: NgbModal,private parserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservation().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  open(content: any, reservation: Reservation) {
    const parsedDate: NgbDateStruct | null = this.parserFormatter.parse(reservation.dateReservation.toString());
    if (parsedDate !== null) {
      this.dateSelectionnee = parsedDate;
    } else {
      console.log('La conversion de la date a échoué');
    }
    
    this.reservationToUpdate = { ...reservation };

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

	private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  searchReservations() {
  }

  sortReservations() {
  }

  deleteReservation(id: number) { 
    this.reservationService.deleteReservation(id);
  }

  updateReservation() {
    console.log(this.dateSelectionnee.day);
    
    this.reservationToUpdate.dateReservation = new Date(this.dateSelectionnee.year,this.dateSelectionnee.month-1,this.dateSelectionnee.day+1);
    this.reservationService.updateRendezVous(this.reservationToUpdate.id,this.reservationToUpdate);
   console.log(this.reservationToUpdate);
  }
}
