import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsInfoComponent } from './doctors-info.component';

describe('DoctorsInfoComponent', () => {
  let component: DoctorsInfoComponent;
  let fixture: ComponentFixture<DoctorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
