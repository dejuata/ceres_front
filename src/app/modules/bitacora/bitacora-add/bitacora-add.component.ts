import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common'
import { BitacoraService } from './../services/bitacora.service';
import { AlertService } from '@shared/alert/services/alert.service';
//import { environment } from '@environments/environment';

@Component({
  selector: 'app-bitacora-add',
  templateUrl: './bitacora-add.component.html',
  styleUrls: ['./bitacora-add.component.scss']
})

export class BitacoraAddComponent implements OnInit {

  //DJANGO_SERVER = `${environment.baseUrl}`
  //form: FormGroup;
  //response: any;
  //imageURL: string;
  bitacoraForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;

  /*constructor(private formBuilder: FormBuilder, private bitacoraService: BitacoraService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      worklog: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('worklog').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('worklog').value);

    this.bitacoraService.worklog(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }*/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bitacoraService: BitacoraService,
    private alertService: AlertService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nuevo Registro de Bitácora" : "Editar Registro de Bitácora";
    if (!this.isAddMode) {
      this.getBitacora();
    }
  }

  formInit(): void {
    this.bitacoraForm = this.formBuilder.group({
      id_zone: ['', Validators.required],
      location: ['', Validators.required],
      soil_type: ['',],
      size: ['',],
      state: ['',],
    });
  }

  get f() {
    return this.bitacoraForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isAddMode) {
      this.createBitacora();
    } else {
        this.updateBitacora();
    }
  }

  cancel(): void {
    this.location.back();
  }

  getBitacora(): void {
    if (!this.isAddMode) {
      this.bitacoraService.getBitacoraById(this.id)
      .subscribe(data => this.bitacoraForm.patchValue(data));
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
}
