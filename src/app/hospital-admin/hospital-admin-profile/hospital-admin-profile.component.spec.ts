import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminProfileComponent } from './hospital-admin-profile.component';

describe('HospitalAdminProfileComponent', () => {
  let component: HospitalAdminProfileComponent;
  let fixture: ComponentFixture<HospitalAdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
