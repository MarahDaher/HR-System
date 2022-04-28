import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-leave-reason',
  templateUrl: './leave-reason.component.html',
  styleUrls: ['./leave-reason.component.scss']
})
export class LeaveReasonComponent extends BaseComponent implements OnInit {

  @Input() employee;
  @Input() selectedImg;

  thumbFallback = 'assets/img/avatar.jpg';

  constructor(
    injector: Injector,
    private modal: NzModalRef,

  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }
  handleCancel(): void {
    this.modal.close();
  }
}
