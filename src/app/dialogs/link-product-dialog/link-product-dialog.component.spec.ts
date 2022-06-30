import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkProductDialogComponent } from './link-product-dialog.component';

describe('LinkProductDialogComponent', () => {
  let component: LinkProductDialogComponent;
  let fixture: ComponentFixture<LinkProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
