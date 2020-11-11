import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';

import { LaborRoutingModule } from './routing.module';
import { LaborListComponent } from './list/component';
import { LaborDetailsComponent } from './details/component';
import { LaborAddEditComponent } from './add-edit/component';

@NgModule({
  declarations: [
    LaborListComponent,
    LaborDetailsComponent,
    LaborAddEditComponent,
  ],
  imports: [
    CommonModule,
    LaborRoutingModule,
    SharedModule
  ]
})

export class LaborModule { }
