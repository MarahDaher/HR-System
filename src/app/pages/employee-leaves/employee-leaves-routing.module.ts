import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLeavesComponent } from './employee-leaves.component';
import { PrintLeaveComponent } from './print-leave/print-leave.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLeavesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesLeavesRoutingModule { }
