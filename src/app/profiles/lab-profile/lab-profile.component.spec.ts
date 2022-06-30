import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabProfileComponent } from './lab-profile.component';

describe('LabProfileComponent', () => {
  let component: LabProfileComponent;
  let fixture: ComponentFixture<LabProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
