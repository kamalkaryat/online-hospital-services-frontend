import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLabsComponent } from './find-labs.component';

describe('FindLabsComponent', () => {
  let component: FindLabsComponent;
  let fixture: ComponentFixture<FindLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
