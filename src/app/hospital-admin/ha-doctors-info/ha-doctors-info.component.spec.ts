import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaDoctorsInfoComponent } from './ha-doctors-info.component';

describe('HaDoctorsInfoComponent', () => {
  let component: HaDoctorsInfoComponent;
  let fixture: ComponentFixture<HaDoctorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaDoctorsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaDoctorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
