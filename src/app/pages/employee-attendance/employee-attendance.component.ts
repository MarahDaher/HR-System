import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { endOfMonth, startOfMonth, subMonths, subDays, startOfDay, endOfDay, startOfYear, endOfYear } from 'date-fns';
import { EmployessService } from 'src/app/shared/proxy/employess/employess.service';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeAttendanceService } from 'src/app/shared/proxy/employee-attendance/employee-attendance.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss']
})
export class EmployeeAttendanceComponent extends BaseComponent implements OnInit {

  selectedEmployee;
  public filterForm: FormGroup;
  public ranges = {};
  public loading: boolean = false;
  public initLoading: boolean;
  public isLoadingEmployee: boolean;
  defaultDate = [startOfDay(new Date()), endOfDay(new Date())]
  employeeList = [];
  employeeAttendance = [];
  totalCount;
  selectedText = 'Select Employee To Show Attendance';
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private employessService: EmployessService,
    private viewContainerRef: ViewContainerRef,
    private employeeAttendanceService: EmployeeAttendanceService,
    public modal: NzModalService,


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
    this.ranges['This Month'] = [startOfMonth(new Date()), endOfMonth(new Date())]
    this.ranges['Last Month'] = [subMonths(startOfMonth(new Date()), 1), subMonths(endOfMonth(new Date()), 1)]

    const filterModal: any = {
      employeeId: [],
      fromDate: startOfDay(new Date()),
      toDate: endOfDay(new Date())
    };

    const filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);
    this.loading = false

    this.submitForm(this.filterForm.value);
    
  }

  submitForm(form: any) {
    this.loading = true;
    form.employeeId = form?.employeeId;
    this.employeeAttendanceService.getEmployeeAttendace(form).subscribe(res => {      
      this.loading = false;
      this.employeeAttendance = res;
      this.totalCount = this.employeeAttendance.length;
      this.loadMoreEmployee();
      this.selectedEmployee = this.employeeList.filter(el => el.id == form?.employeeId);
      this.employeeAttendance.length == 0 ? this.selectedText = 'No Attendance' : this.selectedText = 'Select Employee To Show Attendance';
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
      this.employeeList = res.sort((a, b) => (a.fullName < b.fullName ) ? -1 : 1);;
      this.isLoadingEmployee = false;
    })
  }

  showAcceptedModal(employee?: any) {
    const modal = this.modal.create({
      nzTitle: employee ? 'Edit Employee Attendance' : 'Add Employee Attendance',
      nzContent: AddAttendanceComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        employeeEdit: employee
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
          this.submitForm(result);
        }
      }

    });
  }

  showRejectModal(employee) {
    this.utility.modal.confirm({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This attendance will be deleted !!</b>`,
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
    this.initLoading = true;
    this.loading = true;
    this.employeeAttendanceService.deleteEmployeeAttendance(id).subscribe(res => {
      this.employeeAttendance = this.employeeAttendance.filter(el => el.id != id);
      this.utility.notification.success('Employee Attendance', 'Deleted Successfully !');
      this.initLoading = false;
      this.loading = false;
    });
  }



}
