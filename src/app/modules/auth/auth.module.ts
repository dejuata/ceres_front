import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';


@NgModule({
  declarations: [AuthSigninComponent, AuthSignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
