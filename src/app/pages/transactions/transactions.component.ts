import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { endOfMonth, startOfMonth, subMonths, subDays, startOfDay, endOfDay, startOfYear, endOfYear } from 'date-fns';
import { TransactionsService } from 'src/app/shared/proxy/transactions/transactions.service';
import { MaterialService } from 'src/app/shared/proxy/materials/material.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent  extends BaseComponent implements OnInit {

  filterForm: FormGroup;
  totalCount = 0;
  public loading: boolean = false;
  public initLoading: boolean;
  public isLoadingMaterial: boolean;
  public ranges = {};
  public transactionsList = [];
  materialsList= [];
  defaultDate = [startOfMonth(new Date()), endOfMonth(new Date())]

  constructor(
    private viewContainerRef: ViewContainerRef,
    private transactionsService : TransactionsService,
    injector: Injector,
    private fb: FormBuilder,
    public modal: NzModalService,
    private materialService : MaterialService
  ) { 
    super(injector);
  }

  get materialTypeIdControl(): FormControl {
    return this.filterForm?.get(['materialTypeId']) as FormControl;
  }
  get fromDateControl(): FormControl {
    return this.filterForm?.get(['fromDate']) as FormControl;
  }
  get toDateControl(): FormControl {
    return this.filterForm?.get(['toDate']) as FormControl;
  }

  ngOnInit(): void {

    this.ranges['This Month'] = [startOfMonth(new Date()), endOfMonth(new Date())]
    this.ranges['Last Month'] = [subMonths(startOfMonth(new Date()), 1), subMonths(endOfMonth(new Date()), 1)]

    const filterModal: any = {
      materialTypeId: [],
      fromDate: startOfMonth(new Date()),
      toDate: endOfMonth(new Date())
    };

    const filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);
    this.loading = false

    this.submitForm(this.filterForm.value);
    this.loadMaterials();

  }


  submitForm(form: any) {    
    this.loading = true;
    form.materialTypeId = [form?.materialTypeId];
    this.transactionsService.getTransactions(form).subscribe(res => {      
      this.transactionsList = res;
      this.totalCount = this.transactionsList.length;
      this.loading = false;
    });
  }

  applyFilter(value, type) {
    switch (type) {
      case 'Range':
        this.fromDateControl.setValue(value[0]);
        this.toDateControl.setValue(value[1]);
        break;
      case 'Materials':
        this.materialTypeIdControl.setValue(value);        
        break;
    }
  }

  addTransactions(transaction?){
    const modal = this.modal.create({
      nzTitle: transaction ? 'Edit Transaction' : 'Add Transaction',
      nzContent: AddTransactionComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams : {
        editTransactions : transaction
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {      
      if (result) {
        if (transaction?.id) {
          this.submitForm(result);
          // Object.assign(transaction, result);
        } else {
          this.initLoading = true;
          this.submitForm(result);
        }
      }
    });
  }

  showConfirmDelete(data){
    this.utility.modal.confirm({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This transaction will be deleted !!</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteTransactions(data?.id)
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  deleteTransactions(id){
    this.initLoading = true;
    this.transactionsService.deleteTransactions(id).subscribe(res=>{
      this.transactionsList = this.transactionsList.filter(el => el.id != id);
      this.utility.notification.success( 'Transactions' ,'Deleted Successfully !');
      this.initLoading = false;
    })
  }


  // get Materials
  loadMaterials(){
    this.isLoadingMaterial = true;
    this.materialService.getMaterial().subscribe(res=>{
      this.materialsList= res.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);
      this.isLoadingMaterial = false;
    })
  }
}
