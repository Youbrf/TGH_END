import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { EmployerCreateComponent } from './employer-create/employer-create.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { EmployerEditComponent } from './employer-edit/employer-edit.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'admin',
    children:[
      { path: 'dashboard', component: MainComponent},
      { path: 'users', component: UserListComponent},
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/:id', component: UserDetailsComponent },
      { path: 'users/:id/edit', component: UserEditComponent },
      { path: 'employers', component: EmployerListComponent},
      { path: 'employers/create', component: EmployerCreateComponent},
      { path: 'employers/:id', component: EmployerDetailsComponent},
      { path: 'employers/:id/edit', component: EmployerEditComponent},
      { path: 'services', component: ServiceListComponent },
      { path: 'services/create', component: ServiceCreateComponent },
      { path: 'services/:id', component: ServiceDetailsComponent },
      { path: 'services/:id/edit', component: ServiceEditComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/create', component: ReservationCreateComponent },
      { path: 'reservations/:id', component: ReservationDetailsComponent },
      { path: 'reservations/:id/edit', component: ReservationEditComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
