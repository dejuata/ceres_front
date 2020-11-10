import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports: [
    AlertComponent,
    DataTablesModule
  ]
})
export class SharedModule { }
