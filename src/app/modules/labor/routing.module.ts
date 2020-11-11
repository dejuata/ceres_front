import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaborListComponent } from '@labor/list/component';
import { LaborDetailsComponent } from '@labor/details/component';
import { LaborAddEditComponent } from '@labor/add-edit/component';

const routes: Routes = [
  {
    path: '',
    component: LaborListComponent
  },
  {
    path: 'detail/:id',
    component: LaborDetailsComponent
  },
  {
    path: 'new',
    component: LaborAddEditComponent
  },
  {
    path: 'edit/:id',
    component: LaborAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LaborRoutingModule { }
