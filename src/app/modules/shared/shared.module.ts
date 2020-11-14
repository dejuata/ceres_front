import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { AlertComponent } from './alert/alert.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports: [
    AlertComponent,
    DataTablesModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
