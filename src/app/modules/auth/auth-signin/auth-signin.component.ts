import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  formInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.required
        ]
      ],
      password: ['', [
        Validators.minLength(8),
        Validators.required
        ]
      ],
    });
  }

  onSubmit(): void {
    this.onLogin();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
            if (res) {
              this.router.navigate(['dashboard'])
            }
          })
    }
  }

  getErrorMessage(field: string): string {
    let message = '';

    if (this.loginForm.get(field).errors.required) {
      message = 'El Campo es requerido.';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'El Correo Electrónico no es válido.';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      message = 'La Contraseña debe tener al menos 8 caracteres.';
    }

    return message;
  }

  isValidField(field: string): boolean {
    let touched = this.loginForm.get(field).touched;
    let dirty = this.loginForm.get(field).dirty;
    let invalid = !this.loginForm.get(field).valid;

    return (touched || dirty) && invalid;
  }

}
