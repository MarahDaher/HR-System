import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAttendanceComponent } from './employee-attendance.component';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesAttendanceRoutingModule } from './employee-attendance-routing.module';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';


@NgModule({
  declarations: [
    EmployeeAttendanceComponent,
    AddAttendanceComponent
  ],
  imports: [
    CommonModule,
    AppNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesAttendanceRoutingModule
  ]
})
export class EmployeeAttendanceModule { }
