import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminAppointmentsComponent } from './hospital-admin-appointments.component';

describe('HospitalAdminAppointmentsComponent', () => {
  let component: HospitalAdminAppointmentsComponent;
  let fixture: ComponentFixture<HospitalAdminAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
