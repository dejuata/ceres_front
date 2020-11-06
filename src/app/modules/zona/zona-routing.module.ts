import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonaListComponent } from '@zona/zona-list/zona-list.component';
import { ZonaAddEditComponent } from '@zona/zona-add-edit/zona-add-edit.component';
import { ZonaDetailsComponent } from '@zona/zona-details/zona-details.component';

const routes: Routes = [
  {
    path: '',
    component: ZonaListComponent
  },
  {
    path: 'new',
    component: ZonaAddEditComponent
  },
  {
    path: 'edit/:id',
    component: ZonaAddEditComponent
  },
  {
    path: 'detail/:id',
    component: ZonaDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaRoutingModule { }
