import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraAddEditComponent } from './bitacora-add-edit.component';

describe('BitacoraAddEditComponent', () => {
  let component: BitacoraAddEditComponent;
  let fixture: ComponentFixture<BitacoraAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
