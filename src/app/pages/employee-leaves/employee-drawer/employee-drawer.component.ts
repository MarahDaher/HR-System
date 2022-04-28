import { Component, Injector, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';
import { PrintLeaveComponent } from '../print-leave/print-leave.component';

@Component({
  selector: 'app-employee-drawer',
  templateUrl: './employee-drawer.component.html',
  styleUrls: ['./employee-drawer.component.scss']
})
export class EmployeeDrawerComponent extends BaseComponent implements OnInit {

  @Input() employee;
  @Input() selectedImg;

  constructor(
    injector : Injector,
    private viewContainerRef: ViewContainerRef,
    public modal: NzModalService,
    private drawerRef: NzDrawerRef<any>
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.employee);
    
  }

  printLeave(employee){
    // this.utility.route.navigate(['employee-leaves' ,'print' , employee?.employee?.id]);
    // this.drawerRef.close();

    const modal = this.modal.create({
      nzTitle: 'Employee Leave',
      nzContent: PrintLeaveComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzComponentParams: {
        employee: employee,
        selectedImg: this.selectedImg
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {
    });
  }

}
