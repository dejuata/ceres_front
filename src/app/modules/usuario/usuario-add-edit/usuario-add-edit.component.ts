import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UsuarioService } from '@usuario/services/usuario.service';
import { Usuario } from '@usuario/interfaces/usuario.interface';
import { AlertService } from '@shared/alert/services/alert.service';

@Component({
  selector: 'app-usuario-add-edit',
  templateUrl: './usuario-add-edit.component.html',
  styleUrls: ['./usuario-add-edit.component.scss']
})
export class UsuarioAddEditComponent implements OnInit {
  usuarioForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;

  lista_rol=[
    ["1", "Admin"],
    ["2", "Manager"],
    ["3", "Field manager"],
    ["4", "Operator"]
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nuevo Usuario" : "Editar Usuario";
    if (!this.isAddMode) {
      this.getUsuario();
    }
  }

  formInit(): void {
    this.usuarioForm = this.formBuilder.group({
      email: ['', Validators.required],
      id_card: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      phone: [],
      birthdate: [],
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isAddMode) {
      this.createUsuario();
    } else {
        this.updateUsuario();
    }
  }

  getUsuario(): void {
    if (!this.isAddMode) {
      this.usuarioService.getUsuarioById(this.id)
      .subscribe(data => this.usuarioForm.patchValue(data));
    }
  }

  createUsuario(): void {
    this.usuarioService.createUsuario(this.usuarioForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('El usuario ha sido creado', { keepAfterRouteChange: true });
          this.loading = false;
          this.usuarioForm.reset();
        },
        error: error => {
          if (error instanceof HttpErrorResponse){
            const validationErrors = error.error;
            if (error.status === 400) {
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.usuarioForm.get(prop);
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: validationErrors[prop]
                  });
                }
                this.alertService.error("El Usuario no ha sido creado");
              });
            }
          }
          this.loading = false;
        }
      })
  }

  updateUsuario(): void {
    this.usuarioService.updateUsuario(this.id, this.usuarioForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('El Usuario ha sido actualizado', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error('El Usuario no ha sido actualizado');
          this.loading = false;
        }
      })
  }

}
