import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleAddEditComponent } from '@schedule/schedule-add-edit/schedule-add-edit.component';


const routes: Routes = [
  {
    path: 'new',
    component: ScheduleAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
