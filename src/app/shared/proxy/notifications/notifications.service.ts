import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  getAllNotifications(){
    return this.HttpClient.get<any>(this.pathUrl + "/EmployeeLeaveRequests/GetPendingRequests");
  }

  acceptNotificatin(id , employee){
    return this.HttpClient.post<any>(this.pathUrl + `/EmployeeLeaveRequests/Accept?id=${id}` , employee);
  }

  rejectNotification(id , employee){
    return this.HttpClient.post<any>(this.pathUrl + `/EmployeeLeaveRequests/Reject?id=${id}` , employee);
  }
}
