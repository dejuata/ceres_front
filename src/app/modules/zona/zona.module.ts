import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedModule as ShModule } from '@shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { ZonaRoutingModule } from './zona-routing.module';
import { ZonaListComponent } from './zona-list/zona-list.component';
import { ZonaDetailsComponent } from './zona-details/zona-details.component';
import { ZonaAddEditComponent } from './zona-add-edit/zona-add-edit.component';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [
    ZonaListComponent,
    ZonaDetailsComponent,
    ZonaAddEditComponent,
  ],
  imports: [
    CommonModule,
    ZonaRoutingModule,
    SharedModule,
    ShModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
    })
  ]
})
export class ZonaModule { }
