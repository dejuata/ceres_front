import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { CheckRouteLoginGuard } from '@shared/guards/check-route-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [CheckRouteLoginGuard],
    children: [
      {
        path: 'auth',
        loadChildren: () => import('@auth/auth.module').then(module => module.AuthModule),
      }
    ]
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [CheckLoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('@home/home.module').then(module => module.HomeModule)
      },
      {
        path: 'zona',
        loadChildren: () => import('@zona/zona.module').then(module => module.ZonaModule)
      },
      {
        path: 'labor',
        loadChildren: () => import('@labor/labor.module').then(module => module.LaborModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
