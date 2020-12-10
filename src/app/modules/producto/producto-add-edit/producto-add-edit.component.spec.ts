import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAddEditComponent } from './producto-add-edit.component';

describe('ProductoAddEditComponent', () => {
  let component: ProductoAddEditComponent;
  let fixture: ComponentFixture<ProductoAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
