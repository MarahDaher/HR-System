import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { endOfMonth, startOfMonth, subMonths, subDays, startOfDay, endOfDay, startOfYear, endOfYear } from 'date-fns';
import { EmployeeLeavesService } from 'src/app/shared/proxy/employee-leaves/employee-leaves.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import * as moment from 'moment';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent extends BaseComponent implements OnInit {

  filterForm: FormGroup;
  @Input() employeeList;
  @Input() leavesTypeList;
  public initLoading: boolean;
  public isLoadingEmployee: boolean;
  public isLoadingLeaveType: boolean;
  public ranges = {};
  public requestStatus = [
    { id: 1, name: 'Pending' },
    // { id: 2, name: 'Accepted' },
    // { id: 3, name: 'Rejected' },
  ];

  defaultDate = [startOfDay(new Date()), endOfDay(new Date())]
  fullTime : Boolean;
  showTime: boolean = true;

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledRangeTime: DisabledTimeFn = (_value, type?: DisabledTimePartial) => {
    if (type === 'start') {
      return {
        nzDisabledHours: () => this.range(0, 60).splice(17, 20),
        nzDisabledMinutes: () => this.range(0, 0),
        nzDisabledSeconds: () => [55, 56]
      };
    }
    return {
      nzDisabledHours: () => this.range(0, 60).splice(20, 17),
      nzDisabledMinutes: () => this.range(0, 0),
      nzDisabledSeconds: () => [55, 56]
    };
  };

  get employeeIdControl(): FormControl {
    return this.filterForm?.get(['employeeId']) as FormControl;
  }
  get attendanceControl(): FormControl {
    return this.filterForm?.get(['attendance']) as FormControl;
  }
  get leaveTypeControl(): FormControl {
    return this.filterForm?.get(['leaveType']) as FormControl;
  }
  get fromDateControl(): FormControl {
    return this.filterForm?.get(['fromDate']) as FormControl;
  }
  get toDateControl(): FormControl {
    return this.filterForm?.get(['toDate']) as FormControl;
  }
  get requestStatusIdControl(): FormControl {
    return this.filterForm?.get(['requestStatusId']) as FormControl;
  }

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private modal: NzModalRef,
    public employeeLeavesService: EmployeeLeavesService

  ) {
    super(injector);
  }

  ngOnInit(): void {
    const filterModal = {
      id: 0,
      employeeId: null,
      leaveTypeId: null,
      requestStatusId: null,
      fromDate: null,
      toDate: null,
      reason: null
    };

    let filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);
  }

  submitForm(form: any) {    
    this.initLoading = true;
    this.employeeLeavesService.addEmployeeLeaves(form).subscribe((res: any) => {
      this.utility.notification.success('Employee Leaves', 'Add Successfully');
      this.modal.close(form);
      this.initLoading = false;
    }), (error: any) => {      
      this.utility.notification.error('Employee Leaves', 'Check The Date.');
      this.initLoading = false;
    };
  }

  handleCancel(): void {
    this.modal.close();
  }

  applyFilter(value, type) {
    switch (type) {
      case 'Range':
        this.fromDateControl.setValue(value[0]);
        this.toDateControl.setValue(value[1]);
        break;
      case 'Day':
        this.fromDateControl.setValue(moment(value).format("YYYY-MM-DD") + " 8:30 AM");
        this.toDateControl.setValue(moment(value).format("YYYY-MM-DD") + " 4:00 PM");
        break;
    }
  }

  checkButton(fullTime){
    this.showTime = fullTime ? false : true;
  }
}
