import { Component } from '@angular/core';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent {
  employers = [
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567' }
  ];

  viewEmployerDetails(employer: any) {
    // Logique pour afficher les détails de l'employeur
  }

  addEmployer() {
    // Logique pour ajouter un employeur
  }

  editEmployer(employer: any) {
    // Logique pour modifier l'employeur
  }

  deleteEmployer(employer: any) {
    // Logique pour supprimer l'employeur
  }

  viewReservationHistory(employer: any) {
    // Logique pour afficher l'historique des réservations de l'employeur
  }
}
