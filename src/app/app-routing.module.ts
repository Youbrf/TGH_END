import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/component/home/home.component';
import { ReservationComponent } from './body/component/reservation/reservation.component';
import { AuthentificationComponent } from './body/component/authentification/authentification.component';
import { AdminModule } from './admin/admin.module';
import { ServiceListComponent } from './body/component/service-list/service-list.component';
import { LegalComponent } from './body/component/legal/legal.component';
import { RecapitulatifReservationComponent } from './body/component/recapitulatif-reservation/recapitulatif-reservation.component';
import { ConfirmEmailComponent } from './body/component/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './body/component/reset-password/reset-password.component';
import { userGuard } from './core/_guard/user.guard';
import { adminGuard } from './core/_guard/admin.guard';

const routes: Routes = [
  { path: 'reservation', component:ReservationComponent, canActivate:[userGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'authentification', component: AuthentificationComponent},
  { path: 'admin', loadChildren: () => AdminModule, canActivate:[adminGuard] },
  { path: 'services', component: ServiceListComponent},
  { path: 'legal', component: LegalComponent},
  { path: 'success', component: RecapitulatifReservationComponent},
  { path: 'confirm', component: ConfirmEmailComponent},
  { path: 'reset', component: ResetPasswordComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
