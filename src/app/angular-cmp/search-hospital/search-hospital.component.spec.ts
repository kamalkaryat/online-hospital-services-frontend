import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHospitalComponent } from './search-hospital.component';

describe('SearchHospitalComponent', () => {
  let component: SearchHospitalComponent;
  let fixture: ComponentFixture<SearchHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
