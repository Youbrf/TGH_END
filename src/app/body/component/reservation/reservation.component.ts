import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Service } from 'src/app/models/model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  services!: Service[];

  constructor(private route: ActivatedRoute, private tpc:NgbTimepickerConfig) { }
  
  ngOnInit(): void {
    this.services = JSON.parse(this.route.snapshot.queryParamMap.get('services') ?? '[]');
  }

}
