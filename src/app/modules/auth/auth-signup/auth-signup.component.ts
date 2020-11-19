import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { MustMatch } from '@auth/helpers/must-match.validator';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.onRegister();
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['dashboard']);
          },
          error: error => {
            // this.handlerError(error)
          }
        })
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.registerForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    } else if (this.registerForm.get(field).hasError('pattern')) {
      message = 'El Correo Electrónico no es válido.';
    } else if (this.registerForm.get(field).hasError('minlength')) {
      message = 'La Contraseña debe tener al menos 8 caracteres.';
    } else if (this.registerForm.get(field).hasError('mustMatch')) {
      message = 'La Contraseña debe ser igual';
    }
    return message;
  }

  isValidField(field: string): boolean {
    let touched = this.registerForm.get(field).touched;
    let dirty = this.registerForm.get(field).dirty;
    let invalid = !this.registerForm.get(field).valid;
    return (touched || dirty) && invalid;
  }
}
