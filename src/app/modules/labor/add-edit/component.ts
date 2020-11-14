import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


import { LaborService } from '@labor/services/labor.service';
import { AlertService } from '@shared/alert/services/alert.service';

@Component({
  selector: 'app-labor-add-edit',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
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
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nueva Labor" : "Editar Labor";
    if (!this.isAddMode) {
      this.getLabor();
    }
  }

  formInit(): void {
    this.laborForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['',],
      labor_type: ['',],
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
          this.alertService.success('La Labor ha sido creada', { keepAfterRouteChange: true });
          this.loading = false;
          this.laborForm.reset();
        },
        error: error => {
          if (error instanceof HttpErrorResponse){
            const validationErrors = error.error;
            if (error.status === 400) {
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.laborForm.get(prop);
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: validationErrors[prop]
                  });
                }
                this.alertService.error("La Labor no ha sido creada");
              });
            }
          }
          this.loading = false;
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
}
