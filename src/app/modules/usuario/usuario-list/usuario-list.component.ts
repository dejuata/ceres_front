import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '@usuario/services/usuario.service';
import { Usuario } from '@usuario/interfaces/usuario.interface';

import { language } from '@shared/datatable/language';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(
    private usuarioService: UsuarioService
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
      }, err => {
        console.log(err)
      })
  }

  deleteUsuario(id: string): void {
    this.usuarioService.deleteUsuario(id)
      .subscribe(() => {
        this.usuarios = this.usuarios.filter(item => item.id != parseInt(id));
        alert("Usuario inactivado")
      })
  }

  dataTableOptions(): void {
    this.dtOptions = {
      language: language
    };
  }

}
