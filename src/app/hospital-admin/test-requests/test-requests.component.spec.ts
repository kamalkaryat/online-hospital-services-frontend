import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRequestsComponent } from './test-requests.component';

describe('TestRequestsComponent', () => {
  let component: TestRequestsComponent;
  let fixture: ComponentFixture<TestRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
