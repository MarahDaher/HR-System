import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgZorroAntdModule,
    NotificationsRoutingModule,
    NgbModule
    ],
  exports: [
    NotificationsComponent
  ],
  providers:[
    NgbTooltipConfig
  ]
})
export class NotificationsModule { }
