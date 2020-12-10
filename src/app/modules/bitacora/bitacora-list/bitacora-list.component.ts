import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BitacoraService } from '@bitacora/services/bitacora.service';
import { Bitacora } from '@bitacora/interfaces/bitacora.interface';
import { language } from '@shared/datatable/language';
import { AlertService } from '@shared/alert/services/alert.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';

@Component({
  selector: 'app-bitacora-list',
  templateUrl: './bitacora-list.component.html',
  styleUrls: ['./bitacora-list.component.scss']
})
export class BitacoraListComponent implements OnInit {

  bitacoras: Bitacora[] = [];
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;

  constructor(
    private bitacoraService: BitacoraService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions();
    this.getBitacoras();
  }

  getBitacoras(): void {
    this.bitacoraService.getBitacora()
      .subscribe(data => {
        this.bitacoras = data;
        console.log(data)
        this.loading = true;
      }, err => {
        console.log(err)
      })
  }

  deleteBitacora(id: string): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", () => {
      this.onDelete(id);
    }, () => {
      // console.log("Operación cancelada")
    })
  }

  onDelete(id: string) {
    this.bitacoraService.deleteBitacora(id)
      .subscribe(() => {
        this.bitacoras = this.bitacoras.filter(item => item.id != parseInt(id));
        this.alertService.success('El registro ha sido eliminado de la bitácora', { keepAfterRouteChange: true });
      })
  }

  dataTableOptions(): void {
    this.dtOptions = {
      pageLength: 10,
      language: language,
    };
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
