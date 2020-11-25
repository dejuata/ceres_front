import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSigninComponent } from '@auth/auth-signin/auth-signin.component';
import { AuthSignupComponent } from '@auth/auth-signup/auth-signup.component';
import { ResetPasswordComponent } from '@auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'signin',
    component: AuthSigninComponent
  },
  {
    path: 'signup',
    component: AuthSignupComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
