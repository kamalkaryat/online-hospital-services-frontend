import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindHospitalsComponent } from './find-hospitals.component';

describe('FindHospitalsComponent', () => {
  let component: FindHospitalsComponent;
  let fixture: ComponentFixture<FindHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindHospitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
