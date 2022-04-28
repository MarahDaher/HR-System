import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { endOfMonth, startOfMonth, subMonths, subDays, startOfDay, endOfDay, startOfYear, endOfYear } from 'date-fns';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployessService } from 'src/app/shared/proxy/employess/employess.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeLeavesService } from 'src/app/shared/proxy/employee-leaves/employee-leaves.service';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { LeaveReasonComponent } from './leave-reason/leave-reason.component';
import { NzDrawerPlacement, NzDrawerService } from 'ng-zorro-antd/drawer';
import { EmployeeDrawerComponent } from './employee-drawer/employee-drawer.component';
import { PrintLeaveComponent } from './print-leave/print-leave.component';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss']
})
export class EmployeeLeavesComponent extends BaseComponent implements OnInit {

  selectedEmployee;
  public filterForm: FormGroup;
  public loading: boolean = false;
  public initLoading: boolean;
  public isLoadingEmployee: boolean;
  defaultDate = [startOfMonth(new Date()), endOfMonth(new Date())]
  employeeList = [];
  employeeLeaves = [];
  leavesTypeList = [];
  selectedText = 'Select Employee To Show Leaves';
  totalCount;
  leaveEmployee;
  img;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private employessService: EmployessService,
    private viewContainerRef: ViewContainerRef,
    public modal: NzModalService,
    public employeeLeavesService: EmployeeLeavesService,
    private drawerService: NzDrawerService


  ) {
    super(injector);
  }

  get employeeIdControl(): FormControl {
    return this.filterForm?.get(['employeeId']) as FormControl;
  }
  get fromDateControl(): FormControl {
    return this.filterForm?.get(['fromDate']) as FormControl;
  }
  get toDateControl(): FormControl {
    return this.filterForm?.get(['toDate']) as FormControl;
  }

  ngOnInit(): void {
    const filterModal: any = {
      employeeId: [],
      fromDate: startOfMonth(new Date()),
      toDate: endOfMonth(new Date()),
    };

    const filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);
    this.loading = true;
    this.submitForm(this.filterForm.value);
    this.loadMoreEmployee();
    this.loadLeavesType();
  }

  exportExcel(form){
    this.loading = true;
    form.employeeId = [form?.employeeId];
    let excelFile = [];
    this.employeeLeavesService.getEmployeeALeaves(form).subscribe(res => {
      this.loading = false;
      this.employeeLeaves = res;
      this.employeeLeaves.forEach(el=>{
        excelFile.push({
          employeName : el?.employee?.fullName,
          fromDate : el?.fromDate,
          toDate: el?.toDate,
          type: el?.leaveType?.enName,
          status: el?.requestStatus?.enName,
          leaveHour: el?.totalLeaveHoursDisplay,
          reason: el?.reason
        })
      });      
      this.utility.exportExcel(excelFile);
      this.totalCount = this.employeeLeaves.length;
      this.selectedEmployee = this.employeeList.filter(el => el.id == form?.employeeId);
      this.employeeLeaves.length == 0 ? this.selectedText = 'No Leaves' : this.selectedText = 'Select Employee To Show Leaves';
    });
  }

  submitForm(form: any) {
    this.loading = true;
    form.employeeId = [form?.employeeId];
    this.employeeLeavesService.getEmployeeALeaves(form).subscribe(res => {
      this.loading = false;
      this.employeeLeaves = res;
      this.totalCount = this.employeeLeaves.length;
      this.selectedEmployee = this.employeeList.filter(el => el.id == form?.employeeId);
      this.employeeLeaves.length == 0 ? this.selectedText = 'No Leaves' : this.selectedText = 'Select Employee To Show Leaves';
    });
  }

  applyFilter(value, type) {
    switch (type) {
      case 'Range':
        this.fromDateControl.setValue(value[0]);
        this.toDateControl.setValue(value[1]);
        break;
      case 'Employee':
        this.employeeIdControl.setValue(value);
        break;
    }
  }

  //Employee
  loadMoreEmployee() {
    this.isLoadingEmployee = true;
    this.employessService.getAllEmployess().subscribe(res => {
      this.employeeList = res.sort((a, b) => (a.fullName < b.fullName ) ? -1 : 1);
      this.isLoadingEmployee = false;
    })
  }

  loadLeavesType() {
    // this.isLoadingLeaveType = true;
    this.employeeLeavesService.getLeavesType().subscribe(res => {
      this.leavesTypeList = res;
      // this.isLoadingLeaveType = false;
    });
  }

  showAcceptedModal(employee?: any) {
    const modal = this.modal.create({
      nzTitle: 'Add Employee Leave',
      nzContent: AddLeaveComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        employeeList: this.employeeList,
        leavesTypeList: this.leavesTypeList
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        if (employee?.id) {
          Object.assign(employee, result);
        } else {
          this.loading = true;
          this.isLoadingEmployee = true;
          this.employeeList = [];
          this.loadMoreEmployee();
          let req = {
            employeeId: [],
            fromDate: result?.fromDate,
            toDate: result?.toDate
          };
          this.submitForm(req);
        }
      }
    });
  }

  showRejectModal(employee) {
    this.utility.modal.confirm({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This leaves will be deleted !!</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteEmployeeAttendance(employee?.id)
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  deleteEmployeeAttendance(id) {
    this.loading = true;
    this.employeeLeavesService.deleteEmployeeAttendance(id).subscribe(res => {
      this.employeeLeaves = this.employeeLeaves.filter(el => el.id != id);
      this.utility.notification.success('Employee Leaves', 'Deleted Successfully !');
      this.loading = false;
    });
  }

  showReason(employee) {
    const modal = this.modal.create({
      nzTitle: 'Leave Reasons',
      nzContent: LeaveReasonComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        employee: employee,
        selectedImg: `http://developmentaff-001-site1.dtempurl.com/api/Images/GetImageByName/LeaveRequests%5C${employee.imageName}`
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {
      if (result) {
      }
    });
  }


  printLeave(employee): void {
    const modal = this.modal.create({
      nzTitle: 'Employee Leave',
      nzContent: PrintLeaveComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '1000px',
      nzComponentParams: {
        employee: employee,
        selectedImg: `http://developmentaff-001-site1.dtempurl.com/api/Images/GetImageByName/LeaveRequests%5C${employee.imageName}`
      },
      nzOnOk: () => new Promise(resolve => {
        this.leaveEmployee = employee;
        this.img = `http://developmentaff-001-site1.dtempurl.com/api/Images/GetImageByName/LeaveRequests%5C${employee.imageName}`;
        modal.destroy();
      }),
      nzOkText: 'Print'
    });

    modal.afterClose.subscribe(result => {
    });
  }

}
