import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminSidebarComponent } from './hospital-admin-sidebar.component';

describe('HospitalAdminSidebarComponent', () => {
  let component: HospitalAdminSidebarComponent;
  let fixture: ComponentFixture<HospitalAdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
