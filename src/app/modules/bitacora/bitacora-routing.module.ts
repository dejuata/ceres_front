import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitacoraAddComponent } from '@bitacora/bitacora-add/bitacora-add.component';

const routes: Routes = [
  {
    path: '',
    component: BitacoraAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule { }
