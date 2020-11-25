import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { CheckRouteLoginGuard } from '@shared/guards/check-route-login.guard';
import { OperatorGuard } from '@shared/guards/operator.guard';
import { AdminGuard } from '@shared/guards/admin.guard';
import { ManagerGuard } from '@shared/guards/manager.guard';
import { FieldManagerGuard } from '@shared/guards/fieldmanager.guard';

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
        canActivate: [FieldManagerGuard],
        loadChildren: () => import('@zona/zona.module').then(module => module.ZonaModule)
      },
      {
        path: 'usuario',
        canActivate: [ManagerGuard],
        loadChildren: () => import('@usuario/usuario.module').then(module => module.UsuarioModule),
      },
      {
        path: 'labor',
        canActivate: [FieldManagerGuard],
        loadChildren: () => import('@labor/labor.module').then(module => module.LaborModule)
      },
      {
        path: 'schedule',
        canActivate: [FieldManagerGuard],
        loadChildren: () => import('@schedule/schedule.module').then(module => module.ScheduleModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
