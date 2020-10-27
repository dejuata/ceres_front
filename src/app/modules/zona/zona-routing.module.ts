import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componets
import { ZonaCreateComponent } from './zona-create/zona-create.component';

const routes: Routes = [
  {
    path: 'new',
    component: ZonaCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaRoutingModule { }
