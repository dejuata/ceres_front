import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotTableModule } from '@handsontable/angular';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';

import { ScheduleAddEditComponent } from './schedule-add-edit/schedule-add-edit.component';


@NgModule({
  declarations: [ScheduleAddEditComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    HotTableModule,
    SharedModule
  ]
})
export class ScheduleModule { }
