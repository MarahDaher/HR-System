import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesComponent } from './employees.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
  {
    path: 'add',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'details/:id',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
