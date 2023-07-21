import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { MainComponent } from './main/main.component';
import { HistoryReservationUserComponent } from './history-reservation-user/history-reservation-user.component';
import { ProfilComponent } from './profil/profil.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  {
    path:'admin',
    children:[
      { path: 'dashboard', component: MainComponent},
      { path: 'users', component: UserListComponent},
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/:id', component: UserDetailsComponent },
      { path: 'users/:id/edit', component: UserEditComponent },
      { path: 'users/:id/history', component: HistoryReservationUserComponent},
      { path: 'employers', component: EmployerListComponent},
      { path: 'employers/create', component: UserCreateComponent},
      { path: 'employers/:id', component: UserDetailsComponent},
      { path: 'employers/:id/edit', component: UserEditComponent},
      { path: 'employers/:id/history', component: HistoryReservationUserComponent},
      { path: 'services', component: ServiceListComponent },
      { path: 'services/create', component: ServiceCreateComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/create', component: ReservationCreateComponent },
      { path: 'profil', component: ProfilComponent},
      { path: 'profil/:id/history', component: ReservationListComponent},
      { path: 'profil/:id/edit', component: UserEditComponent },
      { path: 'statistiques', component: StatistiquesComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
