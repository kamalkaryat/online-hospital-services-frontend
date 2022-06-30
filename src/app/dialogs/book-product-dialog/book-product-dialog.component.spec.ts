import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookProductDialogComponent } from './book-product-dialog.component';

describe('BookProductDialogComponent', () => {
  let component: BookProductDialogComponent;
  let fixture: ComponentFixture<BookProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
