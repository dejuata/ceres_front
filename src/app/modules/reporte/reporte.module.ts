import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ActividadesOperarioComponent } from './actividades-operario/actividades-operario.component';
import { ActividadesZonaComponent } from './actividades-zona/actividades-zona.component';

@NgModule({
  declarations: [
    ActividadesOperarioComponent,
    ActividadesZonaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShModule,
    ReporteRoutingModule
  ]
})
export class ReporteModule { }
