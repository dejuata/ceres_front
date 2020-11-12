import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';
import { UsuarioAddEditComponent } from './usuario-add-edit/usuario-add-edit.component';


@NgModule({
  declarations: [
    UsuarioListComponent, 
    UsuarioDetailsComponent, 
    UsuarioAddEditComponent
  ],
  imports: [
    UsuarioRoutingModule,
    CommonModule,
    SharedModule,
    ShModule
  ]
})
export class UsuarioModule { }
