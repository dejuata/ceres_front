import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as ShModule } from '@shared/shared.module';
import { SharedModule } from '../../theme/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ShModule
  ]
})
export class HomeModule { }
