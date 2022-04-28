import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base.component';
import { EmployeeLeavesService } from 'src/app/shared/proxy/employee-leaves/employee-leaves.service';

@Component({
  selector: 'app-print-leave',
  templateUrl: './print-leave.component.html',
  styleUrls: ['./print-leave.component.scss']
})
export class PrintLeaveComponent extends BaseComponent implements OnInit, OnChanges{

  employeeId;
  @Input() employee;
  @Input() selectedImg;
  @Input() print;

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {   
    if(this.print){
      setTimeout(() => { 
                window.print() }, 500);
    }
  }



}
