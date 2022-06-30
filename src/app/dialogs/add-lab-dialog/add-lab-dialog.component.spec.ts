import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabDialogComponent } from './add-lab-dialog.component';

describe('AddLabDialogComponent', () => {
  let component: AddLabDialogComponent;
  let fixture: ComponentFixture<AddLabDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
