import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorDialogComponent } from './add-doctor-dialog.component';

describe('AddDoctorDialogComponent', () => {
  let component: AddDoctorDialogComponent;
  let fixture: ComponentFixture<AddDoctorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
