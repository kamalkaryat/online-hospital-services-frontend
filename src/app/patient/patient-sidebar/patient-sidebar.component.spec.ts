import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSidebarComponent } from './patient-sidebar.component';

describe('PatientSidebarComponent', () => {
  let component: PatientSidebarComponent;
  let fixture: ComponentFixture<PatientSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
