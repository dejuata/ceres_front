import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '@auth/services/auth.service';
import { AlertService } from '@shared/alert/services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.required
      ]],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value)
        .subscribe(data => {
          if (data.success) {
            this.alertService.success('Hemos enviado un enlace al correo electrónico', { keepAfterRouteChange: true });
            this.loading = false;
            this.resetForm.reset();
          }
        }, error => {
          this.loading = false;
          this.alertService.error('Usuario no registrado', { keepAfterRouteChange: true });
        })


    }
  }

  get f() {
    return this.resetForm.controls;
  }

  isValidField(field: string): boolean {
    let touched = this.resetForm.get(field).touched;
    let dirty = this.resetForm.get(field).dirty;
    let invalid = !this.resetForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.resetForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    } else if (this.resetForm.get(field).hasError('pattern')) {
      message = 'El Correo Electrónico no es válido.';
    } else if (this.resetForm.get(field).hasError('minlength')) {
      message = 'La Contraseña debe tener al menos 8 caracteres.';
    }
    return message;
  }

}
