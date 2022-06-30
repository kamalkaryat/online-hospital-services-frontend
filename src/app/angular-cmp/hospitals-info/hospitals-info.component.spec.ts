import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsInfoComponent } from './hospitals-info.component';

describe('HospitalsInfoComponent', () => {
  let component: HospitalsInfoComponent;
  let fixture: ComponentFixture<HospitalsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
