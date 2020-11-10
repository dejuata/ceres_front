import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaborListComponent } from '@labor/labor-list/labor-list.component';

const routes: Routes = [
  {
    path: '',
    component: LaborListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LaborRoutingModule { }
