import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapitulatifReservationComponent } from './recapitulatif-reservation.component';

describe('RecapitulatifReservationComponent', () => {
  let component: RecapitulatifReservationComponent;
  let fixture: ComponentFixture<RecapitulatifReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecapitulatifReservationComponent]
    });
    fixture = TestBed.createComponent(RecapitulatifReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
