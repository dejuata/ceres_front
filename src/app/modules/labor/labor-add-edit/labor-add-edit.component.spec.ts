import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborAddEditComponent } from './labor-add-edit.component';

describe('LaborAddEditComponent', () => {
  let component: LaborAddEditComponent;
  let fixture: ComponentFixture<LaborAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
