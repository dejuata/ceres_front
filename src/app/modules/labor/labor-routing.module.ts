import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaborAddEditComponent } from '@labor/labor-add-edit/labor-add-edit.component';
import { LaborDetailsComponent } from '@labor/labor-details/labor-details.component';
import { LaborListComponent } from '@labor/labor-list/labor-list.component';


const routes: Routes = [
  {
    path: '',
    component: LaborListComponent
  },
  {
    path: 'new',
    component: LaborAddEditComponent
  },
  {
    path: 'edit/:id',
    component: LaborAddEditComponent
  },
  {
    path: 'detail/:id',
    component: LaborDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborRoutingModule { }
