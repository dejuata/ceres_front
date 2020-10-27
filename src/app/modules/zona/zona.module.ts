import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';

import { ZonaRoutingModule } from './zona-routing.module';
import { ZonaCreateComponent } from './zona-create/zona-create.component';


@NgModule({
  declarations: [ZonaCreateComponent],
  imports: [
    CommonModule,
    ZonaRoutingModule,
    SharedModule
  ]
})
export class ZonaModule { }
