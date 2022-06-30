import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptRescheduleDialogComponent } from './apt-reschedule-dialog.component';

describe('AptRescheduleDialogComponent', () => {
  let component: AptRescheduleDialogComponent;
  let fixture: ComponentFixture<AptRescheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AptRescheduleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AptRescheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
