import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDetailsComponent } from './labor-details.component';

describe('LaborDetailsComponent', () => {
  let component: LaborDetailsComponent;
  let fixture: ComponentFixture<LaborDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
