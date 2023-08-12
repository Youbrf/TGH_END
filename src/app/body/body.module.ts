import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './component/service-list/service-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationComponent } from './component/reservation/reservation.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HoursComponent } from './component/hours/hours.component';
import { AuthentificationComponent } from './component/authentification/authentification.component';
import { RegisterComponent } from './component/register/register.component';
import { SigninComponent } from './component/signin/signin.component';
import { LegalComponent } from './component/legal/legal.component';
import { RecapitulatifReservationComponent } from './component/recapitulatif-reservation/recapitulatif-reservation.component';
import { ConfirmEmailComponent } from './component/confirm-email/confirm-email.component';



@NgModule({
  declarations: [
    ServiceListComponent,
    ReservationComponent,
    HomeComponent,
    HoursComponent,
    AuthentificationComponent,
    RegisterComponent,
    SigninComponent,
    LegalComponent,
    RecapitulatifReservationComponent,
    ConfirmEmailComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    ServiceListComponent,
    ReservationComponent
  ]
})
export class BodyModule { }
