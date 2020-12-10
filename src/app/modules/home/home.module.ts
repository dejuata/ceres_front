import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as ShModule } from '@shared/shared.module';
import { SharedModule } from '../../theme/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ShModule,
    FullCalendarModule
  ]
})
export class HomeModule { }
