import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployerEditComponent } from './employer-edit/employer-edit.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { EmployerCreateComponent } from './employer-create/employer-create.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { MainComponent } from './main/main.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent,
    UserEditComponent,
    ServiceListComponent,
    ServiceDetailsComponent,
    ServiceCreateComponent,
    ServiceEditComponent,
    ReservationListComponent,
    ReservationDetailsComponent,
    ReservationCreateComponent,
    ReservationEditComponent,
    DashboardComponent,
    EmployerEditComponent,
    EmployerListComponent,
    EmployerCreateComponent,
    EmployerDetailsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    AdminRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
