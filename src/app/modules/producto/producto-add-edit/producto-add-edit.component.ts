import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ProductoService } from '@producto/services/producto.service';
import { AlertService } from '@shared/alert/services/alert.service';
import { Producto } from '@producto/interfaces/producto.interface';

@Component({
  selector: 'app-producto-add-edit',
  templateUrl: './producto-add-edit.component.html',
  styleUrls: ['./producto-add-edit.component.scss'],
  providers: [ProductoService]
})
export class ProductoAddEditComponent implements OnInit {

  productoForm: FormGroup;
  producto: Producto
  id: string;
  isAddMode: boolean;
  loading = false;
  title: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private alertService: AlertService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.formInit();
    this.title = this.isAddMode ? "Nuevo Producto" : "Editar el valor del Producto";
    if (!this.isAddMode) {
      this.getProducto();
    }
  }

  formInit(): void {
    this.productoForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      serial: ['', Validators.required],
      type_pro: ['', Validators.required],
      date_purchase: ['', Validators.required],
      cost: ['', Validators.required],
    });
  }

  get f() {
    return this.productoForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isAddMode) {
      this.createProducto();
    } else {
      this.updateProducto();
    }
  }

  cancel(): void {
    this.location.back();
  }

  getProducto = () => {
    this.productoService.getProductsById(this.id)
    .subscribe(data => {
        this.producto = data;
      }, err => {
        console.log(err)
    })
  }

  createProducto(): void {
    this.productoService.createProducto(this.productoForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('El producto ha sido creado', { keepAfterRouteChange: true });
          this.loading = true;
          this.router.navigate(['../list'], { relativeTo: this.route });
        },
        error: error => {
          this.handlerError(error);
          this.alertService.error("El producto no ha sido creado");
          this.loading = false;
        }
      })
  }

  updateProducto(): void {
    this.productoService.updateProducto(this.id, this.productoForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('El producto ha sido actualizado', { keepAfterRouteChange: true });
          this.router.navigate(['../../list'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error('El producto no ha sido actualizado');
          this.loading = false;
        }
      })
  }

  handlerError(error) {
    if (error instanceof HttpErrorResponse){
      const validationErrors = error.error;
      if (error.status === 400) {
        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.productoForm.get(prop);
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
    if (this.productoForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    }
    return message;
  }

  isValidField(field: string) {
    let touched = this.productoForm.get(field).touched;
    let dirty = this.productoForm.get(field).dirty;
    let invalid = !this.productoForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

}
