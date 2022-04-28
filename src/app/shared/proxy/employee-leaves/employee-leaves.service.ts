import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeavesService extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  getEmployeeALeaves(form) {
    let req = { employeeId: form?.employeeId, fromDate: form?.fromDate, toDate: form?.toDate };
    return this.HttpClient.get<any>(this.pathUrl + `/EmployeeLeaveRequests?employeeId=${req.employeeId}&fromDate=${moment(req.fromDate).format("YYYY-MM-DD HH:mm:ss")}&toDate=${moment(req.toDate).format("YYYY-MM-DD HH:mm:ss")}`);
  }

  addEmployeeLeaves(form) {
    let req = {
      id: 0,
      employeeId: form?.employeeId,
      leaveTypeId: form?.leaveTypeId,
      requestStatusId: form?.requestStatusId,
      fromDate: form?.fromDate ? moment(form?.fromDate).format("YYYY-MM-DD HH:mm:ss") : null,
      toDate: form?.toDate ? moment(form?.toDate).format("YYYY-MM-DD HH:mm:ss") : null,
      reason: form?.reason
    };
    return this.HttpClient.post<any>(this.pathUrl + `/EmployeeLeaveRequests`, req);
  }

  deleteEmployeeAttendance(id){
    return this.HttpClient.delete<any>(this.pathUrl + `/EmployeeLeaveRequests?id=${id}`);
  }

  getLeavesType(){
    return this.HttpClient.get<any>(this.pathUrl + "/LeaveTypes");
  }
}