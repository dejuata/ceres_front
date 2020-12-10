import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { ReporteService } from '@reporte/services/reporte.service';
import { data } from 'jquery';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-actividades-operario',
  templateUrl: './actividades-operario.component.html',
  styleUrls: ['./actividades-operario.component.scss']
})
export class ActividadesOperarioComponent implements OnInit {

  data_reporte:any = [];

  constructor(
    private reporteService: ReporteService,
  ) { }

  async ngOnInit() {
    const response = await fetch(`${environment.baseUrl}/home/actividades_operario/`);
    const dataN = await response.json();
    this.data_reporte = dataN;
    this.reportInfo();
  }

  reportInfo = () => {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades por operario"
      },
      data: [{
        type: "column",
        dataPoints: this.data_reporte,
      }]
    });
    chart.render();
  }

}
