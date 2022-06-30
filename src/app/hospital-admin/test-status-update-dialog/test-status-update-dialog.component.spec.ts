import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStatusUpdateDialogComponent } from './test-status-update-dialog.component';

describe('TestStatusUpdateDialogComponent', () => {
  let component: TestStatusUpdateDialogComponent;
  let fixture: ComponentFixture<TestStatusUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestStatusUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStatusUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
