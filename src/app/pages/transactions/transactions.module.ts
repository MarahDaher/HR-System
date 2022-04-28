import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgZorroAntdModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
