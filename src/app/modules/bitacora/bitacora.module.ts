import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

//import { ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraRoutingModule } from '@bitacora/bitacora-routing.module';
import { BitacoraAddComponent } from '@bitacora/bitacora-add/bitacora-add.component';
import { BitacoraListComponent } from '@bitacora/bitacora-list/bitacora-list.component'
import { BitacoraDetailsComponent } from '@bitacora/bitacora-details/bitacora-details.component';
import { BitacoraAddEditComponent } from '@bitacora/bitacora-add-edit/bitacora-add-edit.component'

import { RecordRTCService } from '@bitacora/services/record-rtc.service';
@NgModule({
  declarations: [
    BitacoraAddComponent,
    BitacoraListComponent,
    BitacoraDetailsComponent,
    BitacoraAddEditComponent],
  imports: [
    //BrowserModule,
    //ReactiveFormsModule,
    //HttpClientModule,
    CommonModule,
    BitacoraRoutingModule,
    SharedModule,
    ShModule,
    NgbTabsetModule
  ],
  providers: [RecordRTCService],
  //bootstrap: [BitacoraAddComponent]
})
export class BitacoraModule { }
