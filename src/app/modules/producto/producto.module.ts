import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { ProductoRoutingModule } from '@producto/producto-routing.module';
import { ProductoListComponent } from '@producto/producto-list/producto-list.component';
import { environment } from '@environments/environment';
import { ProductoDetailsComponent } from './producto-details/producto-details.component';
import { ProductoAddEditComponent } from './producto-add-edit/producto-add-edit.component';

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoDetailsComponent,
    ProductoAddEditComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    SharedModule,
    HttpClientModule,
    ShModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
    })
  ]
})
export class ProductoModule { }
