import { Component, OnInit } from '@angular/core';
import { ZonaService } from '@zona/services/zona.service';
import { LaborService } from '@labor/services/labor.service';
import { UsuarioService } from '@usuario/services/usuario.service';
import { ScheduleService } from '@schedule/services/schedule.service';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@shared/alert/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-schedule-add-edit',
  templateUrl: './schedule-add-edit.component.html',
  styleUrls: ['./schedule-add-edit.component.scss']
})
export class ScheduleAddEditComponent implements OnInit {

  scheduleForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;

  zonas: any[] = [];
  labores: any[] = [];
  operarios: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private zonaService: ZonaService,
    private laborService: LaborService,
    private userService: UsuarioService,
    private scheduleService: ScheduleService,
    private alertService: AlertService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Crear Actividad" : "Editar Actividad";
    if (!this.isAddMode) {
      this.getActivities();
    }

    this.getZonas();
    this.getLabores();
    this.getUsuarios();
  }

  formInit(): void {
    this.scheduleForm = this.formBuilder.group({
      schedule_date: ['', Validators.required],
      start_hour: [null, Validators.required],
      final_hour: [null, Validators.required],
      zone: ['', Validators.required],
      labor: ['', Validators.required],
      operator: ['', Validators.required],
      observation: ['',],
      name_operator: ['',],
      codigo_zona: ['',],
      nombre_labor: ['',]
    })
  }

  get f() {
    return this.scheduleForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    this.setValueForm();
    if (this.isAddMode) {
      this.createSchedule();
    } else {
      this.updateSchedule();
    }
  }

  cancel() {
    this.location.back();
  }

  getActivities(): void {
    if (!this.isAddMode) {
      this.scheduleService.getActivitieById(this.id)
        .subscribe(data => this.scheduleForm.patchValue(data));
    }
  }

  setValueForm() {
    let zona = this.scheduleForm.get('zone').value
    let zona_result = this.zonas.filter(item => item[0] == zona)
    this.scheduleForm.get('codigo_zona').setValue(zona_result[0][1])

    let labor = this.scheduleForm.get('labor').value
    let labor_result = this.labores.filter(item => item[0] == labor)
    this.scheduleForm.get('nombre_labor').setValue(labor_result[0][1])

    let operator = this.scheduleForm.get('operator').value
    let operator_result = this.operarios.filter(item => item[0] == operator)
    this.scheduleForm.get('name_operator').setValue(operator_result[0][1])
  }

  createSchedule(): void {
    this.scheduleService.createActivitie(this.scheduleForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('La Actividad ha sido creada', { keepAfterRouteChange: true });
          this.loading = false;
          this.scheduleForm.reset();
        },
        error: error => {
          this.handlerError(error);
          this.alertService.error("La Actividad no ha sido creada");
          this.loading = false;
        }
      })

  }

  updateSchedule(): void {
    this.scheduleService.updateActivitie(this.id, this.scheduleForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('La Actividad ha sido actualizada', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error('La Actividad no ha sido actualizada');
          this.loading = false;
        }
      })
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

  getLabores(): void {
    this.laborService.getLabors()
      .subscribe(data => {
        data.forEach((elem) => {
          this.labores.push([elem.id, elem.name])
        })
      }, err => {
        console.log(err)
      })
  }

  getUsuarios(): void {
    this.userService.getUsuarios()
      .subscribe(data => {
        data.forEach((elem) => {
          if (elem.role == '4') {
            this.operarios.push([elem.id, `${elem.first_name} ${elem.last_name}`])
          }
        })
      }, err => {
        console.log(err)
      })
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.scheduleForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    }
    return message;
  }

  isValidField(field: string) {
    let touched = this.scheduleForm.get(field).touched;
    let dirty = this.scheduleForm.get(field).dirty;
    let invalid = !this.scheduleForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

  handlerError(error) {
    if (error instanceof HttpErrorResponse) {
      const validationErrors = error.error;
      if (error.status === 400) {
        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.scheduleForm.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: validationErrors[prop]
            });
          }
        });
      }
    }
  }

}
