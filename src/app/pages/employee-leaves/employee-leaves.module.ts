import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesLeavesRoutingModule } from './employee-leaves-routing.module';
import { EmployeeLeavesComponent } from './employee-leaves.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { LeaveReasonComponent } from './leave-reason/leave-reason.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { EmployeeDrawerComponent } from './employee-drawer/employee-drawer.component';
import { PrintLeaveComponent } from './print-leave/print-leave.component';



@NgModule({
  declarations: [
    EmployeeLeavesComponent,
    AddLeaveComponent,
    LeaveReasonComponent,
    EmployeeDrawerComponent,
    PrintLeaveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesLeavesRoutingModule,
    AppNgZorroAntdModule,
    NgbModule,
    NzDrawerModule
  ],
  exports:[
    EmployeeLeavesComponent,
    LeaveReasonComponent,
    PrintLeaveComponent
  ],
  providers:[
    NgbTooltipConfig
  ]
})
export class EmployeeLeavesModule { }
