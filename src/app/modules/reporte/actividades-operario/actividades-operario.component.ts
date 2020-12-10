import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { ReporteService } from '@reporte/services/reporte.service';
import { ZonaService } from '@zona/services/zona.service';
import { data } from 'jquery';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-actividades-operario',
  templateUrl: './actividades-operario.component.html',
  styleUrls: ['./actividades-operario.component.scss']
})
export class ActividadesOperarioComponent implements OnInit{

  data_reporte:any = [];
  data_hecho_reporte:any = [];
  data_no_hecho_reporte:any = [];
  start: string = '';
  end: string = '';
  zone: string = '';

  zonas: any[] = [];

  constructor(
    private reporteService: ReporteService,
    private zonaService: ZonaService,
  ) { }

  async ngOnInit() {
    // const response = await fetch(`${environment.baseUrl}/home/actividades_operario/`);
    // const dataN = await response.json();
    // this.data_reporte = dataN;
    // this.reportInfo();
    this.getZonas();
    this.update_reports();
  }

  update_reports () {
    this.update_report();
    this.update_report_done();
    this.update_report_not_done();
  }

  async update_report () {
    let parameters = {
      start: this.start,
      end: this.end,
      zone: this.zone
    }
    const response = await fetch(`${environment.baseUrl}/home/actividades_operario/`,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parameters)});
    const dataN = await response.json();
    this.data_reporte = dataN;
    this.reportInfo();
  }

  reportInfo = () => {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades totales por operario"
      },
      data: [{
        type: "column",
        dataPoints: this.data_reporte,
      }]
    });
    chart.render();
  }

  getZonas(): void {
    this.zonaService.getZonas()
      .subscribe(data => {
        data.forEach((elem) => {
          this.zonas.push([elem.id, elem.id_zone])
        });
      }, err => {
        console.log(err)
      })
  }

  limpiar(): void {
    this.start = '';
    this.end = '';
    this.zone = '';
  }

  async update_report_done () {
    let parameters = {
      start: this.start,
      end: this.end,
      zone: this.zone
    }
    const response = await fetch(`${environment.baseUrl}/home/actividades_hechas_operario/`,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parameters)});
    const dataN = await response.json();
    this.data_hecho_reporte = dataN;
    this.reportInfoDone();
  }

  reportInfoDone = () => {
    let chart = new CanvasJS.Chart("chartContainerDone", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades realizadas por operario"
      },
      data: [{
        type: "column",
        dataPoints: this.data_hecho_reporte,
      }]
    });
    chart.render();
  }

  async update_report_not_done () {
    let parameters = {
      start: this.start,
      end: this.end,
      zone: this.zone
    }
    const response = await fetch(`${environment.baseUrl}/home/actividades_no_hechas_operario/`,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parameters)});
    const dataN = await response.json();
    this.data_no_hecho_reporte = dataN;
    this.reportInfoNotDone();
  }

  reportInfoNotDone = () => {
    let chart = new CanvasJS.Chart("chartContainerNotDone", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades no realizadas aún por operario"
      },
      data: [{
        type: "column",
        dataPoints: this.data_no_hecho_reporte,
      }]
    });
    chart.render();
  }

}
