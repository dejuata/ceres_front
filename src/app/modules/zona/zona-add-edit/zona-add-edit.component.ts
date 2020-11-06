import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { ZonaService } from '@zona/services/zona.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private zonaService: ZonaService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.getZona();
  }

  formInit(): void {
    this.zonaForm = this.formBuilder.group({
      id_zone: ['', Validators.required],
      location: ['', Validators.required],
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

  private getZona(): void {
    if (!this.isAddMode) {
      this.zonaService.getZonaById(this.id)
      .pipe(first())
      .subscribe(data => this.zonaForm.patchValue(data));
    }
  }

  private createZona(): void {
    this.zonaService.createZona(this.zonaForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert("Zona Agregada")
          this.loading = false;
        },
        error: error => {
          console.log("error", error);
          this.loading = false;
        }
      })

    //
    this.zonaForm.reset();
    /*
    this.zonaService.createZona(this.zonaForm.value)
      .pipe(first())
      .subscribe(data => {
        console.log("data", data);
      }, err => {
        if (err instanceof HttpErrorResponse){
          const validationErrors = err.error;
          if (err.status === 400) {
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.zonaForm.get(prop);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[prop]
                });
              }
            });
          }
        }
      })
      */
  }

  private updateZona(): void {
    this.zonaService.updateZona(this.id, this.zonaForm.value)
      //.pipe(first())
      .subscribe({
        next: () => {
          alert("Zona Actualizada");
        },
        error: error => {
          console.log(error);
        }
      })
    this.loading = false;
  }

}
