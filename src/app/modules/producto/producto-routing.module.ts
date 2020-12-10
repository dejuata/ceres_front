import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoListComponent } from '@producto/producto-list/producto-list.component';
import { ProductoDetailsComponent } from '@producto/producto-details/producto-details.component';
import { ProductoAddEditComponent } from '@producto/producto-add-edit/producto-add-edit.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductoListComponent
  },
  {
    path: 'detail/:id',
    component: ProductoDetailsComponent
  },
  {
    path: 'new',
    component: ProductoAddEditComponent
  },
  {
    path: 'edit/:id',
    component: ProductoAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
