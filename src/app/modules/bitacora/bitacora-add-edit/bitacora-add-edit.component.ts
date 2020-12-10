import { BitacoraService } from '@bitacora/services/bitacora.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/alert/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecordRTCService } from '@bitacora/services/record-rtc.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';

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
  @ViewChild('audio') audio: ElementRef;


  actividades: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private bitacoraService: BitacoraService,
    public _recordRTC: RecordRTCService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nuevo Registro de Bitacora" : "Editar Registro de Bitacora";
    if (!this.isAddMode) {
      this.getBitacora();
    }

    this.getActivitiesUser();
  }

  getBitacora(): void {
    if (!this.isAddMode) {
      this.bitacoraService.getBitacoraById(this.id)
        .subscribe(data => this.bitacoraForm.patchValue(data));
    }
  }

  startVoiceRecord() {
    console.log("grabando...")
    this._recordRTC.toggleRecord();
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

    // this.setValueForm();
    if (this.isAddMode) {
      this.createBitacora();
    } else {
      this.updateBitacora();
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
    let user = this.authService.userValue.role;
    this.bitacoraService.getActivitiesUser(user)
      .subscribe(data => {
        data.actividades.forEach((elem) => {
          this.actividades.push([parseInt(elem.id), elem.schedule_date, elem.name_operator, elem.codigo_zona, elem.nombre_labor])
        })
      })
  }

  selectDataUser(event: any) {
    let actividad = this.actividades.filter(item => {
      return item[0] == event
    })
    try {
      this.bitacoraForm.get('name_operator').setValue(actividad[0][2])
      this.bitacoraForm.get('codigo_zona').setValue(actividad[0][3])
      this.bitacoraForm.get('nombre_labor').setValue(actividad[0][4])
    } catch {
      this.bitacoraForm.get('name_operator').setValue('')
      this.bitacoraForm.get('codigo_zona').setValue('')
      this.bitacoraForm.get('nombre_labor').setValue('')
    }

  }

  setCurrentPosition(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.bitacoraForm.get('lat').setValue(position.coords.latitude)
        this.bitacoraForm.get('lng').setValue(position.coords.longitude)
      });
    }
  }

  setFormData() {
    const formData = new FormData();
    formData.append('date', this.bitacoraForm.get('date').value);
    formData.append('actividad', this.bitacoraForm.get('actividad').value);
    formData.append('description', this.bitacoraForm.get('description').value);
    formData.append('lat', this.bitacoraForm.get('lat').value);
    formData.append('lng', this.bitacoraForm.get('lng').value);
    formData.append('name_operator', this.bitacoraForm.get('name_operator').value);
    formData.append('codigo_zona', this.bitacoraForm.get('codigo_zona').value);
    formData.append('nombre_labor', this.bitacoraForm.get('nombre_labor').value);
    //formData.append('audio', this._recordRTC?.blobUrl);
    console.log(this.bitacoraForm.get('file').value)
    if (this.isAddMode) {
      formData.append('file', this.bitacoraForm.get('file').value);
    }
    return formData
  }

  createBitacora(): void {
    this.bitacoraService.createBitacora(this.setFormData())
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
    this.bitacoraService.updateBitacora(this.id, this.setFormData())
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

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bitacoraForm.get('file').setValue(file);
    }
  }




}
