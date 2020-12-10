import { BitacoraService } from '@bitacora/services/bitacora.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/alert/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecordRTCService } from '@bitacora/services/record-rtc.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bitacora-add-edit',
  templateUrl: './bitacora-add-edit.component.html',
  styleUrls: ['./bitacora-add-edit.component.scss']
})
export class BitacoraAddEditComponent implements OnInit {

  bitacoraForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;


  actividades: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private bitacoraService: BitacoraService,
    public _recordRTC: RecordRTCService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nuevo Registro de Bitacora" : "Editar Registro de Bitacora";
    if (!this.isAddMode) {
      // this.getLabor();
    }

    this.getActivitiesUser();
  }

  startVoiceRecord() {
    console.log("grabando...")
    this._recordRTC.toggleRecord();
  }

  saveAudio() {
    this._recordRTC.save();
  }

  formInit(): void {
    this.bitacoraForm = this.formBuilder.group({
      date: ['', Validators.required],
      description: ['',],
      file: ['',],
      lat: ['',],
      lng: ['',],
      audio: ['',],
      actividad: ['',],
      name_operator: [{value: '', disabled: true},],
      codigo_zona: [{value: '', disabled: true},],
      nombre_labor: [{value: '', disabled: true},]
    });
  }

  get f() {
    return this.bitacoraForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    //this.bitacoraForm.get('audio').setValue(this._recordRTC.blobUrl)
    console.log('entro', this.bitacoraForm.value)
    // this.setValueForm();
    if (this.isAddMode) {
      this.createBitacora();
    } else {
      //this.updateBitacora();
    }
  }

  cancel() {
    this.location.back();
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.bitacoraForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    }
    return message;
  }

  isValidField(field: string) {
    let touched = this.bitacoraForm.get(field).touched;
    let dirty = this.bitacoraForm.get(field).dirty;
    let invalid = !this.bitacoraForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

  getActivitiesUser(): void {
    this.bitacoraService.getActivitiesUser('1')
      .subscribe(data => {
        console.log("data", data)
        data.actividades.forEach((elem) => {
          this.actividades.push([parseInt(elem.id), elem.schedule_date, elem.name_operator, elem.codigo_zona, elem.nombre_labor])
        })
      })
  }

  selectDataUser(event: any) {
    let actividad = this.actividades.filter(item => {
      return item[0] == event
    })
    this.bitacoraForm.get('name_operator').setValue(actividad[0][2])
    this.bitacoraForm.get('codigo_zona').setValue(actividad[0][3])
    this.bitacoraForm.get('nombre_labor').setValue(actividad[0][4])
  }

  setCurrentPosition(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.bitacoraForm.get('lat').setValue(position.coords.latitude)
        this.bitacoraForm.get('lng').setValue(position.coords.longitude)
      });
    }
  }

  createBitacora(): void {
    this.bitacoraService.createBitacora(this.bitacoraForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('El registro en bitácora ha sido creado', { keepAfterRouteChange: true });
          this.loading = false;
          this.bitacoraForm.reset();
        },
        error: error => {
          this.handlerError(error);
          this.alertService.error("El registro de bitácora no ha sido creado");
          this.loading = false;
        }
      })
  }

  updateBitacora(): void {
    this.bitacoraService.updateBitacora(this.id, this.bitacoraForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('El registro de bitácora ha sido actualizado', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error('El registro de bitácora no ha sido actualizado');
          this.loading = false;
        }
      })
  }

  handlerError(error) {
    if (error instanceof HttpErrorResponse){
      const validationErrors = error.error;
      if (error.status === 400) {
        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.bitacoraForm.get(prop);
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
