import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryReservationUserComponent } from './history-reservation-user.component';

describe('HistoryReservationUserComponent', () => {
  let component: HistoryReservationUserComponent;
  let fixture: ComponentFixture<HistoryReservationUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryReservationUserComponent]
    });
    fixture = TestBed.createComponent(HistoryReservationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
