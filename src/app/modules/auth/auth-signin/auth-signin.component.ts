import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.email,
        Validators.required])
      ],
      password: [null, Validators.compose([
        Validators.minLength(8),
        Validators.required])],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.onLogin();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(res => {
          if (res) {
            console.log("login")
            // colocar ruta de redirección
            this.router.navigate([''])
          }
        })
    }
  }

}
