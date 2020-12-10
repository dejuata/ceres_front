import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componetes
//import { HomeComponent } from './reporte/reporte.component';
import { ActividadesOperarioComponent } from './actividades-operario/actividades-operario.component';
import { ActividadesZonaComponent } from './actividades-zona/actividades-zona.component';

const routes: Routes = [
  {
    path: 'actividades_operario',
    component: ActividadesOperarioComponent
  },
  {
    path: 'actividades_zona',
    component: ActividadesZonaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
