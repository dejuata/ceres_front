import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '@usuario/services/usuario.service';
import { Usuario } from '@usuario/interfaces/usuario.interface';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {
  usuario: Usuario
  id: string

  lista_rol=[
    ["1", "Admin"],
    ["2", "Manager"],
    ["3", "Field manager"],
    ["4", "Operator"]
  ];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUsuario();
  }

  getUsuario(): void {
    this.usuarioService.getUsuarioById(this.id)
      .subscribe(data => {
        this.usuario = data;
      })
  }

  getDescriptionRole(key): String {
    var result = ""
    this.lista_rol.forEach(function(r) {
      if (r[0] == key){
        result = r[1];
      }
    });
    return result;
  }

}
