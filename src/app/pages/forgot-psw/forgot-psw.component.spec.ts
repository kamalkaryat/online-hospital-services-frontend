import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPswComponent } from './forgot-psw.component';

describe('ForgotPswComponent', () => {
  let component: ForgotPswComponent;
  let fixture: ComponentFixture<ForgotPswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
