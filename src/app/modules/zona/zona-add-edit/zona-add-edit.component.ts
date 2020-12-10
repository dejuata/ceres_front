import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ZonaService } from '@zona/services/zona.service';
import { AlertService } from '@shared/alert/services/alert.service';
import { LatLngLiteral } from '@agm/core/map-types';
declare const google: any;
@Component({
  selector: 'app-zona-add-edit',
  templateUrl: './zona-add-edit.component.html',
  styleUrls: ['./zona-add-edit.component.scss']
})
export class ZonaAddEditComponent implements OnInit {


  zonaForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;
  zoom: number = 15;
  maps = false;
  latitud: number = 0;
  longitud: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private zonaService: ZonaService,
    private alertService: AlertService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nueva Zona de Campo" : "Editar Zona de Campo";
    if (!this.isAddMode) {
      this.getZona();
      this.maps = true;
    }
  }

  formInit(): void {
    this.zonaForm = this.formBuilder.group({
      id_zone: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      soil_type: ['',],
      size: ['',],
      state: ['',],
    });
  }

  get f() {
    return this.zonaForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isAddMode) {
      this.createZona();
    } else {
      this.updateZona();
    }
  }

  cancel(): void {
    this.location.back();
  }

  getZona(): void {
    if (!this.isAddMode) {
      this.zonaService.getZonaById(this.id)
        .subscribe(data => this.zonaForm.patchValue(data));
    }
  }

  createZona(): void {
    this.zonaService.createZona(this.zonaForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('La Zona de Campo ha sido creada', { keepAfterRouteChange: true });
          this.loading = false;
          this.zonaForm.reset();
        },
        error: error => {
          this.handlerError(error);
          this.alertService.error("La Zona de Campo no ha sido creada");
          this.loading = false;
        }
      })
  }

  updateZona(): void {
    this.zonaService.updateZona(this.id, this.zonaForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('La Zona de Campo ha sido actualizada', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error('La Zona de Campo no ha sido actualizada');
          this.loading = false;
        }
      })
  }

  handlerError(error) {
    if (error instanceof HttpErrorResponse) {
      const validationErrors = error.error;
      if (error.status === 400) {
        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.zonaForm.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: validationErrors[prop]
            });
          }
        });
      }
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.zonaForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    }
    return message;
  }

  isValidField(field: string) {
    let touched = this.zonaForm.get(field).touched;
    let dirty = this.zonaForm.get(field).dirty;
    let invalid = !this.zonaForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

  setCurrentPosition(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.zonaForm.get('lat').setValue(position.coords.latitude)
        this.zonaForm.get('lng').setValue(position.coords.longitude)
        this.latitud = +position.coords.latitude;
        this.longitud = +position.coords.longitude;
        this.maps = true;
      });
    }
  }
}
