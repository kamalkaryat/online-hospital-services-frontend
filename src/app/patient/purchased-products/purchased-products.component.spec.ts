import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedProductsComponent } from './purchased-products.component';

describe('PurchasedProductsComponent', () => {
  let component: PurchasedProductsComponent;
  let fixture: ComponentFixture<PurchasedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
