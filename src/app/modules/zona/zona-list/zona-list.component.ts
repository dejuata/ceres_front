import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ZonaService } from '@zona/services/zona.service';
import { Zona } from '@zona/interfaces/zona.interface';
import { language } from '@shared/datatable/language';
import { AlertService } from '@shared/alert/services/alert.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';

@Component({
  selector: 'app-zona-list',
  templateUrl: './zona-list.component.html',
  styleUrls: ['./zona-list.component.scss']
})
export class ZonaListComponent implements OnInit {

  zonas: Zona[] = [];
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;

  constructor(
    private zonaService: ZonaService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions();
    this.getZonas();
  }

  getZonas(): void {
    this.zonaService.getZonas()
      .subscribe(data => {
        this.zonas = data;
        this.loading = true;
      }, err => {
        console.log(err)
      })
  }

  deleteZona(id: string): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", () => {
      this.onDelete(id);
    }, () => {
      // console.log("Operación cancelada")
    })
  }

  onDelete(id: string) {
    this.zonaService.deleteZona(id)
      .subscribe(() => {
        this.zonas = this.zonas.filter(item => item.id != parseInt(id));
        this.alertService.success('La Zona de Campo ha sido eliminada', { keepAfterRouteChange: true });
      })
  }

  dataTableOptions(): void {
    this.dtOptions = {
      pageLength: 10,
      language: language,
    };
  }

}
