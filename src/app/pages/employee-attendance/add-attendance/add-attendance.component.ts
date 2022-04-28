import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { endOfMonth, startOfMonth, subMonths, subDays, startOfDay, endOfDay, startOfYear, endOfYear } from 'date-fns';
import { EmployessService } from 'src/app/shared/proxy/employess/employess.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { EmployeeAttendanceService } from 'src/app/shared/proxy/employee-attendance/employee-attendance.service';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent extends BaseComponent implements OnInit {

  filterForm: FormGroup;
  public initLoading: boolean;
  public isLoadingEmployee: boolean;
  public ranges = {};
  @Input() employeeEdit;

  defaultDate = [startOfDay(new Date()), endOfDay(new Date())]
  employeeList = [];

  get employeeIdControl(): FormControl {
    return this.filterForm?.get(['employeeId']) as FormControl;
  }
  get attendanceControl(): FormControl {
    return this.filterForm?.get(['attendance']) as FormControl;
  }

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private employessService: EmployessService,
    private employeeAttendanceService : EmployeeAttendanceService,

  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.ranges['Today'] = [startOfDay(new Date()), endOfDay(new Date())]
    this.ranges['Yesterday'] = [subDays(startOfDay(new Date()), 1), subDays(endOfDay(new Date()), 1)]
    this.ranges['ThisMonth'] = [startOfMonth(new Date()).toLocaleTimeString(), endOfMonth(new Date()).toLocaleTimeString()]
    this.ranges['LastMonth'] = [subMonths(startOfMonth(new Date()), 1), subMonths(endOfMonth(new Date()), 1)]
    this.ranges['ThisYear'] = [startOfYear(new Date()), endOfYear(new Date())]

    const filterModal = {
      id:0,
      employeeId: null,
      createdDate: null,
      checkIn : null,
      checkOut : null,
    };

    let filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);
    this.loadMoreEmployee();
    if (this.employeeEdit) {            
      this.filterForm.patchValue(this.employeeEdit);
    }
  }

  submitForm(form :any){    
    this.initLoading = true;
    if(!this.employeeEdit){
      this.employeeAttendanceService.addEmployeeAttendace(form).subscribe((res:any)=>{
        this.utility.notification.success('Employee Attendance', 'Add Successfully');
        this.initLoading = false;
        this.modal.close(form);
      } , err => {
        this.initLoading = false;
        this.utility.notification.error('Employee Attendance', 'You Should Choose Employee And Date');
      });
    }
    else {
      this.employeeAttendanceService.editEmployeeAttendace(form).subscribe(res=>{
        this.utility.notification.success('Employee Attendance', 'Edit Successfully');
        this.initLoading = false;
        this.modal.close(form);
      }), err=>{
        this.utility.notification.error('Employee Attendance', 'You Should Choose Employee And Date');
        this.initLoading = false;
      };
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

  handleCancel(): void {
    this.modal.close();
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => this.range(0, 24).splice(19, 20),
    nzDisabledMinutes: () => this.range(0, 0),
    nzDisabledSeconds: () => [55, 56]
  });

}
