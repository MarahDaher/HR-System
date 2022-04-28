import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { AddMaterialsComponent } from './add-materials/add-materials.component';




@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeDetailsComponent,
    AddMaterialsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgZorroAntdModule,
    EmployeesRoutingModule
  ],
  exports:[
    EmployeeDetailsComponent,
    AddMaterialsComponent
  ]
})
export class EmployeesModule { }
