import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgZorroAntdModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
