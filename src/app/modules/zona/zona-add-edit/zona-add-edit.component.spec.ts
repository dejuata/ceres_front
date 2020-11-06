import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAddEditComponent } from './zona-add-edit.component';

describe('ZonaAddEditComponent', () => {
  let component: ZonaAddEditComponent;
  let fixture: ComponentFixture<ZonaAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
