import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@home/home.module').then(module => module.HomeModule)
      },
      {
        path: 'zona',
        loadChildren: () => import('@zona/zona.module').then(module => module.ZonaModule)
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [CheckLoginGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@auth/auth.module').then(module => module.AuthModule),
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
