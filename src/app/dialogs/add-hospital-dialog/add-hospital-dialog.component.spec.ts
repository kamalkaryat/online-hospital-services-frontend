import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalDialogComponent } from './add-hospital-dialog.component';

describe('AddHospitalDialogComponent', () => {
  let component: AddHospitalDialogComponent;
  let fixture: ComponentFixture<AddHospitalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHospitalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
