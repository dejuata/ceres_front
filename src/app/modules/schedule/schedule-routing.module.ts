import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleAddEditComponent } from '@schedule/schedule-add-edit/schedule-add-edit.component';
import { CalendarComponent } from '@schedule/calendar/calendar.component';
import { ScheduleDetailsComponent } from '@schedule/schedule-details/schedule-details.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';


const routes: Routes = [
  {
    path: '',
    component: ScheduleListComponent
  },
  {
    path: 'new',
    component: ScheduleAddEditComponent
  },
  {
    path: 'edit/:id',
    component: ScheduleAddEditComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'detail/:id',
    component: ScheduleDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
