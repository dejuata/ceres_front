import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

//import { ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { BitacoraAddComponent } from './bitacora-add/bitacora-add.component';
import { BitacoraListComponent } from './bitacora-list/bitacora-list.component'
import { BitacoraDetailsComponent } from './bitacora-details/bitacora-details.component'


@NgModule({
  declarations: [
    BitacoraAddComponent,
    BitacoraListComponent,
    BitacoraDetailsComponent],
  imports: [
    //BrowserModule,
    //ReactiveFormsModule,
    //HttpClientModule,
    CommonModule,
    BitacoraRoutingModule,
    SharedModule,
    ShModule
  ],
  //providers: [],
  //bootstrap: [BitacoraAddComponent]
})
export class BitacoraModule { }
