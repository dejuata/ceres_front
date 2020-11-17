import { AlertService } from './../../shared/alert/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Labor } from '@labor/interfaces/labor.interface';
import { LaborService } from '@labor/services/labor.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';
import { language } from '@shared/datatable/language';

@Component({
  selector: 'app-labor-list',
  templateUrl: './labor-list.component.html',
  styleUrls: ['./labor-list.component.scss']
})
export class LaborListComponent implements OnInit {

  labors: Labor[] = [];
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;

  constructor(
    private laborService: LaborService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,

  ) { }

  ngOnInit(): void {
    this.dataTableOptions();
    this.getLabors();
  }

  getLabors(): void {
    this.laborService.getLabors()
      .subscribe(data => {
          this.labors = data;
          this.loading = true;
        }, err => {
          console.log(err)
      })
  }

  deleteLabor(id: string): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", () => {
      this.onDelete(id);
    }, () => {
      // console.log("Operación cancelada")
    })
  }

  onDelete(id: string) {
    this.laborService.deleteLabor(id)
      .subscribe(() => {
        this.labors = this.labors.filter(item => item.id != parseInt(id));
        this.alertService.success('La Labor de Campo ha sido eliminada', { keepAfterRouteChange: true });
      })
  }

  dataTableOptions(): void {
    this.dtOptions = {
      pageLength: 10,
      language: language,
    };
  }

}
