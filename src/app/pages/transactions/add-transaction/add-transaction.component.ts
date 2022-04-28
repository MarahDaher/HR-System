import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';
import { MaterialService } from 'src/app/shared/proxy/materials/material.service';
import { TransactionsService } from 'src/app/shared/proxy/transactions/transactions.service';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent extends BaseComponent implements OnInit {

  @Input() editTransactions;
  filterForm: FormGroup;
  initLoading = false;
  materialsList = []
  public isLoadingMaterial: boolean;

  constructor(
    injector : Injector,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private transactionsService : TransactionsService,
    private materialService : MaterialService

  ) { 
    super(injector);
  }

  ngOnInit(): void {

    const filterModal = {
        id: 0,
        transactionDate: null,
        materialTypeId: 0,
        serialNumber: null,
        quantity: 0,
        createdDate: null
    };

    let filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);
    this.loadMaterials();
    
    if(this.editTransactions){
      this.filterForm.patchValue(this.editTransactions);
    }
    
  }

  submitForm(form: any) {
    this.initLoading = true;
    if(!this.editTransactions){
      this.transactionsService.addTransactions(form).subscribe((res: any) => {
        this.utility.notification.success('Add Transactions', 'Add Successfully');
        this.modal.close(form); 
        this.initLoading = false;
      }, (error: any) => {
          this.utility.notification.error('Add Transactions', 'Check The Date');
          this.initLoading = false;
      });
    }
    else {
      this.transactionsService.editTransactions(form).subscribe((res: any) => {
        this.utility.notification.success('Edit Transactions', 'Add Successfully');
        this.modal.close(form); 
        this.initLoading = false;
      }, (error: any) => {
          this.utility.notification.error('Edit Transactions', 'Check The Date');
          this.initLoading = false;
      });
    }

  }

  handleCancel(): void {
    this.modal.close();
  }

  loadMaterials(){
    this.isLoadingMaterial = true;
    this.materialService.getMaterial().subscribe(res=>{
      this.materialsList= res.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.isLoadingMaterial = false;
    })
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => this.range(0, 24).splice(17, 20),
    nzDisabledMinutes: () => this.range(0, 0),
    nzDisabledSeconds: () => [55, 56]
  });
}
