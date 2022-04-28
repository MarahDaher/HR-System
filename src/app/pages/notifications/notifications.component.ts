import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';
import { NotificationsService } from 'src/app/shared/proxy/notifications/notifications.service';
import { LeaveReasonComponent } from '../employee-leaves/leave-reason/leave-reason.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {

  notificationList = [];
  totalCount = 0 ;
  initLoading : boolean;
  public loading: boolean = false;
  constructor(
    injector : Injector,
    private notificationsService : NotificationsService,
    private viewContainerRef: ViewContainerRef,
    public modal: NzModalService,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications(){
    this.loading = true;
    this.notificationsService.getAllNotifications().subscribe(res=>{
      this.notificationList = res;
      this.totalCount = this.notificationList.length;
      this.loading = false;
    });
  }

  showAcceptedModal(note?){    
    this.utility.modal.success({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This Notification will be accepted !!</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.acceptedNote(note?.id , note)
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  acceptedNote(id , note){    
    this.initLoading = true;
    this.notificationsService.acceptNotificatin(id , note).subscribe(res=>{
      this.notificationList = this.notificationList.filter(el => el.id != id);
      this.utility.notification.success( 'Notifications' ,'Accept Successfully !');
      this.initLoading = false;
    });
  }

  showRejectModal(note?){
    this.utility.modal.confirm({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This Notification will be rejected !!</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.rejectedNote(note?.id , note)
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  rejectedNote(id , note){   
    this.initLoading = true; 
    this.notificationsService.rejectNotification(id , note).subscribe(res=>{
      this.notificationList = this.notificationList.filter(el => el.id != id);
      this.utility.notification.success( 'Notifications' ,'Reject Successfully !');
      this.initLoading = false;
    });
  }


  showReason(employee) {
    const modal = this.modal.create({
      nzTitle: 'Leave Reasons',
      nzContent: LeaveReasonComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        employee: employee,
        selectedImg: `http://developmentaff-001-site1.dtempurl.com/api/Images/GetImageByName/LeaveRequests%5C${employee?.imageName}`
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {
      if (result) {
      }
    });
  }
  
}
