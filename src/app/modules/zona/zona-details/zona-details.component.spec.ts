import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaDetailsComponent } from './zona-details.component';

describe('ZonaDetailsComponent', () => {
  let component: ZonaDetailsComponent;
  let fixture: ComponentFixture<ZonaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
