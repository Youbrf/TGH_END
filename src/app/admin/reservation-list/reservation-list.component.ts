import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from 'src/app/core/_service/authentification/authentification.service';
import { ReservationService } from 'src/app/core/_service/reservation/reservation.service';
import { UserService } from 'src/app/core/_service/user/user.service';
import { Reservation, User } from 'src/app/models/model';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  dateSelectionnee!: NgbDateStruct;
  searchQuery!: string;
  closeResult = '';
  reservationToUpdate: Reservation = new Reservation();
  employers: User[] = [];
  users: User[] = [];
  reservations!: MatTableDataSource<Reservation>;
  displayedColumns: string[] = [
    'dateReservation',
    'heureDebut',
    'heureFin',
    'statutReservation',
    'employer.firstname',
    'user.firstname',
    'services',
    'actions'
  ];

  @ViewChild(MatSort, { static: true }) sort!: MatSort | null;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;
  reservationToDetails:Reservation=new Reservation();
  idUser!: number;
  isAdmin: boolean = false;
  reservationStatuses: string[] = ["CONFIRMED", "PENDING", "CANCELLED"];
  paymentStates: string[] = ["PAID", "UNPAID"];
  
  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    private modalService: NgbModal,
    private parserFormatter: NgbDateParserFormatter,
    private route: ActivatedRoute,
    private auth : AuthentificationService
  ) {}

  ngOnInit() {
    this.isAdminUser();    
    if (!this.isAdmin) {
      const indexToRemove = this.displayedColumns.indexOf('user.firstname');
      if (indexToRemove !== -1) {
        this.displayedColumns.splice(indexToRemove, 1);
      }
    }
    this.loadReservations();
    this.loadUserAndEmployer();
  }

  isAdminUser(): boolean { 
    if (this.auth.getRole()==='ADMIN') {
      return this.isAdmin = true; 
    }else{
      this.idUser = +this.route.snapshot.params['id'];
      return this.isAdmin;
    }
  }

  loadReservations() {
    if (this.idUser != null) {
      this.reservationService.getReservationByUser(this.idUser).subscribe(reservations => {
        this.reservations = new MatTableDataSource(reservations);
        this.reservations.sort = this.sort;
        this.reservations.paginator = this.paginator;
        this.reservations.filterPredicate = (data: Reservation, filter: string) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
      });
    } else {
      this.reservationService.getAllReservation().subscribe(reservations => {
      this.reservations = new MatTableDataSource(reservations);
      this.reservations.sort = this.sort;
      this.reservations.paginator = this.paginator;
      this.reservations.filterPredicate = (data: Reservation, filter: string) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
    }
  }

  loadUserAndEmployer() {
    this.userService.getAllUsers().subscribe(users => {
      for (const user of users) {
        if (user.role === 'USER') {
          this.users.push(user);
        }
        if (user.role === 'EMPLOYEE') {
          this.employers.push(user);
        }
      }
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

  openD(contentD: any, reservation: Reservation) {
    
    this.reservationToDetails = { ...reservation };
    this.modalService.open(contentD, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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
    this.reservations.filter = this.searchQuery.trim().toLowerCase();
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id);
  }

  updateReservation() {
    this.reservationToUpdate.dateReservation = new Date(
      this.dateSelectionnee.year,
      this.dateSelectionnee.month - 1,
      this.dateSelectionnee.day + 1
    );
    this.reservationService.updateReservation(this.reservationToUpdate.id, this.reservationToUpdate).subscribe(
      () => {
        alert('Réservation mis à jour avec succès');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la mis à jour de la réservation', error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.reservations.filter = filterValue.trim().toLowerCase();
    if (this.reservations.paginator) {
      this.reservations.paginator.firstPage();
    }
  }
  
}
