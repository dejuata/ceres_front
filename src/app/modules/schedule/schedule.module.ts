import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import { ScheduleRoutingModule } from '@schedule/schedule-routing.module';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';

import { ScheduleAddEditComponent } from '@schedule/schedule-add-edit/schedule-add-edit.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from '@schedule/calendar/calendar.component';
import { ScheduleDetailsComponent } from '@schedule/schedule-details/schedule-details.component';
import { ScheduleListComponent } from '@schedule/schedule-list/schedule-list.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [ScheduleAddEditComponent, CalendarComponent, ScheduleDetailsComponent, ScheduleListComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FullCalendarModule,
    SharedModule,
    ShModule
  ]
})
export class ScheduleModule { }
