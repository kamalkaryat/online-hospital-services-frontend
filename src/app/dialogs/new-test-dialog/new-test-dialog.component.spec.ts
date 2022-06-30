import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestDialogComponent } from './new-test-dialog.component';

describe('NewTestDialogComponent', () => {
  let component: NewTestDialogComponent;
  let fixture: ComponentFixture<NewTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
