
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)
      },
      {
        path: 'zona',
        loadChildren: () => import('./modules/zona/zona.module').then(module => module.ZonaModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./modules/usuario/usuario.module').then(module => module.UsuarioModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
