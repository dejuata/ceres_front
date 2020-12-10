import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesOperarioComponent } from './actividades-operario.component';

describe('ActividadesOperarioComponent', () => {
  let component: ActividadesOperarioComponent;
  let fixture: ComponentFixture<ActividadesOperarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesOperarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
