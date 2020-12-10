import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { ReporteService } from '@reporte/services/reporte.service';
import { ZonaService } from '@zona/services/zona.service';
import { data } from 'jquery';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-actividades-zona',
  templateUrl: './actividades-zona.component.html',
  styleUrls: ['./actividades-zona.component.scss']
})
export class ActividadesZonaComponent implements OnInit{

  data_reporte:any = [];
  data_hecho_reporte:any = [];
  data_no_hecho_reporte:any = [];
  start: string = '';
  end: string = '';

  constructor(
    private reporteService: ReporteService,
    private zonaService: ZonaService,
  ) { }

  async ngOnInit() {
    // const response = await fetch(`${environment.baseUrl}/home/actividades_zona/`);
    // const dataN = await response.json();
    // this.data_reporte = dataN;
    // this.reportInfo();
    //this.getZonas();
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
      end: this.end
    }
    const response = await fetch(`${environment.baseUrl}/home/actividades_zona/`,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parameters)});
    const dataN = await response.json();
    this.data_reporte = dataN;
    this.reportInfo();
  }

  reportInfo = () => {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades totales por zona"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
			  indexLabel: "{name} - #percent%",
        dataPoints: this.data_reporte,
      }]
    });
    chart.render();
  }

  limpiar(): void {
    this.start = '';
    this.end = '';
  }

  async update_report_done () {
    let parameters = {
      start: this.start,
      end: this.end
    }
    const response = await fetch(`${environment.baseUrl}/home/actividades_hechas_zona/`,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parameters)});
    const dataN = await response.json();
    this.data_hecho_reporte = dataN;
    this.reportInfoDone();
  }

  reportInfoDone = () => {
    let chart = new CanvasJS.Chart("chartContainerDone", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades realizadas por zona"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
			  indexLabel: "{name} - #percent%",
        dataPoints: this.data_hecho_reporte,
      }]
    });
    chart.render();
  }

  async update_report_not_done () {
    let parameters = {
      start: this.start,
      end: this.end
    }
    const response = await fetch(`${environment.baseUrl}/home/actividades_no_hechas_zona/`,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parameters)});
    const dataN = await response.json();
    this.data_no_hecho_reporte = dataN;
    this.reportInfoNotDone();
  }

  reportInfoNotDone = () => {
    let chart = new CanvasJS.Chart("chartContainerNotDone", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Actividades no realizadas aún por zona"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
			  indexLabel: "{name} - #percent%",
        dataPoints: this.data_no_hecho_reporte,
      }]
    });
    chart.render();
  }

}
