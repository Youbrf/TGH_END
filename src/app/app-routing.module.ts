import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/component/home/home.component';
import { ReservationComponent } from './body/component/reservation/reservation.component';
import { AuthentificationComponent } from './body/component/authentification/authentification.component';
import { AdminModule } from './admin/admin.module';
import { ServiceListComponent } from './body/component/service-list/service-list.component';
import { LegalComponent } from './body/component/legal/legal.component';
import { RecapitulatifReservationComponent } from './body/component/recapitulatif-reservation/recapitulatif-reservation.component';

const routes: Routes = [
  { path: 'reservation', component:ReservationComponent },
  { path: 'home', component: HomeComponent},
  { path: 'authentification', component: AuthentificationComponent},
  { path: 'admin', loadChildren: () => AdminModule },
  { path: 'services', component: ServiceListComponent},
  { path: 'legal', component: LegalComponent},
  { path: 'success', component: RecapitulatifReservationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
