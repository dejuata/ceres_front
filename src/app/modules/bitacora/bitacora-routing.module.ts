import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitacoraListComponent } from '@bitacora/bitacora-list/bitacora-list.component';
import { BitacoraDetailsComponent } from '@bitacora/bitacora-details/bitacora-details.component'
import { BitacoraAddEditComponent } from '@bitacora/bitacora-add-edit/bitacora-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BitacoraListComponent
  },
  {
    path: 'new',
    component: BitacoraAddEditComponent
  },
  {
    path: 'edit/:id',
    component: BitacoraAddEditComponent
  },
  {
    path: 'detail/:id',
    component: BitacoraDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule { }
