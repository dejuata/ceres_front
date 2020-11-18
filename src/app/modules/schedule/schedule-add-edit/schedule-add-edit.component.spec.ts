import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAddEditComponent } from './schedule-add-edit.component';

describe('ScheduleAddEditComponent', () => {
  let component: ScheduleAddEditComponent;
  let fixture: ComponentFixture<ScheduleAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
