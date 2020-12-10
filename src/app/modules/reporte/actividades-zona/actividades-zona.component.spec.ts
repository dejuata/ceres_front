import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesZonaComponent } from './actividades-zona.component';

describe('ActividadesZonaComponent', () => {
  let component: ActividadesZonaComponent;
  let fixture: ComponentFixture<ActividadesZonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesZonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
