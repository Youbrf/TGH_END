import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { MainComponent } from './main/main.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryReservationUserComponent } from './history-reservation-user/history-reservation-user.component';
import { ProfilComponent } from './profil/profil.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StatistiquesComponent } from './statistiques/statistiques.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent,
    UserEditComponent,
    ServiceListComponent,
    ServiceCreateComponent,
    ReservationListComponent,
    ReservationCreateComponent,
    DashboardComponent,
    EmployerListComponent,
    MainComponent,
    HistoryReservationUserComponent,
    ProfilComponent,
    StatistiquesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
