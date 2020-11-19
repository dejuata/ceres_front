import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraDetailsComponent } from './bitacora-details.component';

describe('BitacoraDetailsComponent', () => {
  let component: BitacoraDetailsComponent;
  let fixture: ComponentFixture<BitacoraDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
