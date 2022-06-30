import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDoctorsComponent } from './find-doctors.component';

describe('FindDoctorsComponent', () => {
  let component: FindDoctorsComponent;
  let fixture: ComponentFixture<FindDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
