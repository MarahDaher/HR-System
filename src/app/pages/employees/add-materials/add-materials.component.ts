import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';
import { EmployeeMaterialsService } from 'src/app/shared/proxy/employee-materials/employee-materials.service';
import { MaterialService } from 'src/app/shared/proxy/materials/material.service';
import { TransactionsService } from 'src/app/shared/proxy/transactions/transactions.service';
import { endOfMonth, startOfMonth,} from 'date-fns';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.scss']
})
export class AddMaterialsComponent extends BaseComponent implements OnInit {

  filterForm: FormGroup;
  employeeId: string;
  initLoading: boolean;
  materialList = [];
  transactionList = [];
  isLoadingMaterial: boolean;
  isLoadingTransaction: boolean;
  dateFormat = 'M/d/yy, h:mm a'
  constructor(
    injector : Injector,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private route: ActivatedRoute,
    private employeeMaterialsService : EmployeeMaterialsService,
    private materialService : MaterialService,
    private transactionsService : TransactionsService,

  ) { 
    super(injector);
  }

  get materialTypeIdControl(): FormControl {
    return this.filterForm?.get(['materialTypeId']) as FormControl;
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params.id;
    
    const filterModal = {
      id: null,
      employeeId: this.employeeId,
      materialTypeId: null,
      inTransactionId: null,
      quantity: null,
      notes: null,
      createdDate: null
    };

    let filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);

    this.materialTypeIdControl.valueChanges.subscribe(res=>{
      this.loadMoreTransactions();
    });
  }


  submitForm(form: any) { 
    this.initLoading = true;   
    this.employeeMaterialsService.addEmployeeMaterials(form).subscribe((res: any) => {
      this.initLoading = false;
      this.utility.notification.success('Employee Material', 'Add Successfully');
      this.modal.close(form); 
    }, (error: any) => {
        this.utility.notification.error('Employee Leaves', error);
        this.initLoading = false;
    });
  }

  handleCancel(): void {
    this.modal.close();
  }

  loadMoreMaterial(){
    this.isLoadingMaterial = true;
    this.materialService.getMaterial().subscribe(res=>{
      this.materialList = res;
      this.isLoadingMaterial = false;
    });
  }

  onSearchMaterial(){
    this.loadMoreMaterial();
  }

  // Transactions
  loadMoreTransactions(){
    this.isLoadingTransaction = true;
    this.transactionsService.getTransactions({
      materialTypeId : this.materialTypeIdControl.value,
      fromDate: null ,
      toDate: null
    }).subscribe(res=>{
      this.transactionList = res;
      this.isLoadingTransaction = false;
    })
  }

  onSearchTransactions(){
    this.loadMoreTransactions();
  }
}
