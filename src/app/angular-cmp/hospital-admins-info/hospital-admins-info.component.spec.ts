import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminsInfoComponent } from './hospital-admins-info.component';

describe('HospitalAdminsInfoComponent', () => {
  let component: HospitalAdminsInfoComponent;
  let fixture: ComponentFixture<HospitalAdminsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
