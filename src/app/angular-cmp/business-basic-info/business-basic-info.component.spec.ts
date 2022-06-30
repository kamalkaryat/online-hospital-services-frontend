import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBasicInfoComponent } from './business-basic-info.component';

describe('BusinessBasicInfoComponent', () => {
  let component: BusinessBasicInfoComponent;
  let fixture: ComponentFixture<BusinessBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
