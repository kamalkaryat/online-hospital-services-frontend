import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUpdateDialogComponent } from './stock-update-dialog.component';

describe('StockUpdateDialogComponent', () => {
  let component: StockUpdateDialogComponent;
  let fixture: ComponentFixture<StockUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
