import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioListComponent } from '@usuario/usuario-list/usuario-list.component';
import { UsuarioAddEditComponent } from '@usuario/usuario-add-edit/usuario-add-edit.component';
import { UsuarioDetailsComponent } from '@usuario/usuario-details/usuario-details.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioListComponent
  },
  {
    path: 'new',
    component: UsuarioAddEditComponent
  },
  {
    path: 'edit/:id',
    component: UsuarioAddEditComponent
  },
  {
    path: 'detail/:id',
    component: UsuarioDetailsComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
