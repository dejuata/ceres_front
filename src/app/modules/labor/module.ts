import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';

import { LaborRoutingModule } from './routing.module';
import { LaborListComponent } from './labor-list/labor-list.component';

@NgModule({
  declarations: [
    LaborListComponent,
  ],
  imports: [
    CommonModule,
    LaborRoutingModule,
    SharedModule
  ]
})

export class LaborModule { }
