import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitacoraAddComponent } from '@bitacora/bitacora-add/bitacora-add.component';
import { BitacoraListComponent } from '@bitacora/bitacora-list/bitacora-list.component';
import { BitacoraDetailsComponent } from '@bitacora/bitacora-details/bitacora-details.component'

const routes: Routes = [
  {
    path: '',
    component: BitacoraListComponent
  },
  {
    path: 'new',
    component: BitacoraAddComponent
  },
  {
    path: 'edit/:id',
    component: BitacoraAddComponent
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
