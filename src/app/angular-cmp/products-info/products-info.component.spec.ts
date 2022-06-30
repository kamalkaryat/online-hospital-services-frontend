import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInfoComponent } from './products-info.component';

describe('ProductsInfoComponent', () => {
  let component: ProductsInfoComponent;
  let fixture: ComponentFixture<ProductsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
