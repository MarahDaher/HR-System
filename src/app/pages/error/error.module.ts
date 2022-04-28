import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { ErrorRoutingModule } from './error-routing.module';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    AppNgZorroAntdModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
