import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraAddComponent } from './bitacora-add.component';

describe('BitacoraAddComponent', () => {
  let component: BitacoraAddComponent;
  let fixture: ComponentFixture<BitacoraAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
