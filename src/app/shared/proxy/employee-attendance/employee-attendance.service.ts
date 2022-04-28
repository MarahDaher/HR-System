import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  getEmployeeAttendace(form){    
    let req = { employeeId: form?.employeeId, fromDate: form?.fromDate , toDate:  form?.toDate};
    return this.HttpClient.get<any>(this.pathUrl + `/EmployeeAttendances?employeeIds=${req.employeeId}&fromDate=${moment(req.fromDate).format("YYYY-MM-DD HH:mm:ss")}&toDate=${moment(req.toDate).format("YYYY-MM-DD HH:mm:ss")}`);
  }

  addEmployeeAttendace(form){
    let req = { 
      employeeId: form?.employeeId,
      checkOut : form?.checkOut ? moment(form?.checkOut).format("YYYY-MM-DD HH:mm:ss") : null,
      checkIn : form?.checkIn ? moment(form?.checkIn).format("YYYY-MM-DD HH:mm:ss") : null
    }
    return this.HttpClient.post<any>(this.pathUrl + `/EmployeeAttendances` , req);
  }

  editEmployeeAttendace(form){
    let req = { 
      id: form?.id,
      employeeId: form?.employeeId,
      checkOut : form?.checkOut ? moment(form?.checkOut).format("YYYY-MM-DD HH:mm:ss") : null,
      checkIn : form?.checkIn ? moment(form?.checkIn).format("YYYY-MM-DD HH:mm:ss") : null,
      createdDate: form?.createdDate
    }
    return this.HttpClient.put<any>(this.pathUrl + `/EmployeeAttendances` , req);
  }


  deleteEmployeeAttendance(id){
    return this.HttpClient.delete<any>(this.pathUrl + `/EmployeeAttendances?id=${id}`);
  }
}
