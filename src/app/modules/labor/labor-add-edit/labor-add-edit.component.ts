import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { LaborService } from '@labor/services/labor.service';
import { AlertService } from '@shared/alert/services/alert.service';

@Component({
  selector: 'app-labor-add-edit',
  templateUrl: './labor-add-edit.component.html',
  styleUrls: ['./labor-add-edit.component.scss']
})
export class LaborAddEditComponent implements OnInit {

  laborForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private laborService: LaborService,
    private alertService: AlertService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nueva Labor de Campo" : "Editar Labor de Campo";
    if (!this.isAddMode) {
      this.getLabor();
    }
  }

  formInit(): void {
    this.laborForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['',],
      labor_type: ['', Validators.required],
    });
  }

  get f() {
    return this.laborForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isAddMode) {
      this.createLabor();
    } else {
      this.updateLabor();
    }
  }

  cancel(): void {
    this.location.back();
  }

  getLabor(): void {
    if (!this.isAddMode) {
      this.laborService.getLaborById(this.id)
        .subscribe(data => this.laborForm.patchValue(data));
    }
  }

  createLabor(): void {
    this.laborService.createLabor(this.laborForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('La Labor de Campo ha sido creada', { keepAfterRouteChange: true });
          this.loading = false;
          this.laborForm.reset();
        },
        error: error => {
          this.handlerError(error);
          this.alertService.error("La Labor de Campo no ha sido creada");
          this.loading = false;
          this.backgroundSync();
        }
      })
  }

  updateLabor(): void {
    this.laborService.updateLabor(this.id, this.laborForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('La Labor ha sido actualizada', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error('La Labor no ha sido actualizada');
          this.loading = false;
        }
      })
  }

  handlerError(error) {
    if (error instanceof HttpErrorResponse){
      const validationErrors = error.error;
      if (error.status === 400) {
        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.laborForm.get(prop);
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
    if (this.laborForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    }
    return message;
  }

  isValidField(field: string) {
    let touched = this.laborForm.get(field).touched;
    let dirty = this.laborForm.get(field).dirty;
    let invalid = !this.laborForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

  postSync() {

  }

  backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }
}
