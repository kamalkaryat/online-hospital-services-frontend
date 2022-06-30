import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminHomeComponent } from './hospital-admin-home.component';

describe('HospitalAdminHomeComponent', () => {
  let component: HospitalAdminHomeComponent;
  let fixture: ComponentFixture<HospitalAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
