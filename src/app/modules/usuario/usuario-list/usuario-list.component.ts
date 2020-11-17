import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '@usuario/services/usuario.service';
import { Usuario } from '@usuario/interfaces/usuario.interface';

import { language } from '@shared/datatable/language';
import { AlertService } from '@shared/alert/services/alert.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;
  rol = {
    '1': 'Administrador',
    '2': 'Empleado',
    '3': 'Jefe de Campo',
    '4': 'Operario'
  }

  constructor(
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.dataTableOptions();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios()
      .subscribe(data => {
        this.usuarios = data;
        this.loading = true;
      }, err => {
        console.log(err)
      })
  }

  deleteUsuario(id: string): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", () => {
      this.onDelete(id);
    }, () => {
      // console.log("Operación cancelada")
    })
  }

  onDelete(id: string) {
    this.usuarioService.deleteUsuario(id)
      .subscribe(() => {
        this.usuarios = this.usuarios.filter(item => item.id != parseInt(id));
        this.alertService.success('El usario ha sido eliminado', { keepAfterRouteChange: true });
      })
  }

  dataTableOptions(): void {
    this.dtOptions = {
      pageLength: 10,
      language: language
    };
  }

}
