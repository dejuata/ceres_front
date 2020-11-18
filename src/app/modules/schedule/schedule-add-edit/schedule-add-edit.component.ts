import { ScheduleService } from './../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import { ZonaService } from '@zona/services/zona.service';
import { LaborService } from '@labor/services/labor.service';
import { UsuarioService } from '@usuario/services/usuario.service';
import { Location } from '@angular/common';

import 'handsontable-key-value';


@Component({
  selector: 'app-schedule-add-edit',
  templateUrl: './schedule-add-edit.component.html',
  styleUrls: ['./schedule-add-edit.component.scss']
})
export class ScheduleAddEditComponent implements OnInit {

  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  hotSettings: Handsontable.GridSettings = {
    startRows: 12,
    startCols: 7,
    colHeaders: true,
    rowHeaders: true,
    colWidths: [110, 100, 100, 120, 180, 160, 200],
    rowHeights: 30,
    manualColumnResize: true,
    manualRowResize: true,
    width: '100%',
    // data: Handsontable.helper.createSpreadsheetData(4, 4),
  }

  source: [
    {
      id: 1,
      name: 'Ready',
    },
    {
      id: 2,
      name: 'Cancelled',
    },
    {
      id: 3,
      name: 'Done',
    },
  ]

  zonas: any[] = [];
  labores: any[] = [];
  operarios: any[] = [];

  constructor(
    private zonaService: ZonaService,
    private laborService: LaborService,
    private userService: UsuarioService,
    private scheduleService: ScheduleService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getZonas();
    this.getLabores();
    this.getUsuarios();
  }

  swapHotData() {
    this.hotRegisterer.getInstance(this.id).loadData([['new', 'data']]);
  }

  onSaveData() {
    let data = this.cleanedGridData(this.hotRegisterer.getInstance(this.id).getData());
    console.log(data)
  }

  cleanedGridData(data) {
    let result = []
    data.forEach( row => {
      if (row[0] != null) {
        result.push({
          "schedule_date": row[0],
          "start_hour": row[1],
          "final_hour": row[2],
          "zone": row[3],
          "labor": row[4],
          "operator": row[5],
          "observation": row[6],
        })
      }
    });
    return result
  }

  getZonas(): void {
    this.zonaService.getZonas()
      .subscribe(data => {
        this.zonas = data.map((elem) => elem.id_zone);
      }, err => {
        console.log(err)
      })
  }

  getLabores(): void {
    this.laborService.getLabors()
      .subscribe(data => {
        this.labores = data.map((elem) => elem.name);
      }, err => {
        console.log(err)
      })
  }

  getUsuarios(): void {
    this.userService.getUsuarios()
      .subscribe(data => {
        this.operarios = data.filter(elem => elem.role == '4')
          .map(elem => `${elem.first_name} ${elem.last_name}`)
      }, err => {
        console.log(err)
      })
  }

  cancel() {
    this.location.back();
  }

}
