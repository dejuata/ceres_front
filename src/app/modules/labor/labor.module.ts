import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';

import { LaborRoutingModule } from './labor-routing.module';
import { LaborAddEditComponent } from './labor-add-edit/labor-add-edit.component';
import { LaborDetailsComponent } from './labor-details/labor-details.component';
import { LaborListComponent } from './labor-list/labor-list.component';


@NgModule({
  declarations: [LaborAddEditComponent, LaborDetailsComponent, LaborListComponent],
  imports: [
    CommonModule,
    LaborRoutingModule,
    SharedModule,
    ShModule
  ]
})
export class LaborModule { }
