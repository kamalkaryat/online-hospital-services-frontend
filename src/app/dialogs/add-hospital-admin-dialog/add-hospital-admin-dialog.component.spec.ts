import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalAdminDialogComponent } from './add-hospital-admin-dialog.component';

describe('AddHospitalAdminDialogComponent', () => {
  let component: AddHospitalAdminDialogComponent;
  let fixture: ComponentFixture<AddHospitalAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHospitalAdminDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
