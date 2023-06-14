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



@NgModule({
  declarations: [
    ServiceListComponent,
    ReservationComponent,
    HomeComponent,
    HoursComponent
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
