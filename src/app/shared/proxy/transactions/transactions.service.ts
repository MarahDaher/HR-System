import { Injectable, Injector } from '@angular/core';
import * as moment from 'moment';
import { BaseComponent } from '../../base.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  getTransactions(form) {
    let req = { materialTypeId: form?.materialTypeId, fromDate: form?.fromDate ?  moment(form.fromDate).format("YYYY-MM-DD HH:mm:ss") : null  , toDate: form?.toDate?  moment(form?.toDate).format("YYYY-MM-DD HH:mm:ss") : null};
    
    let url = this.pathUrl + `/InTransactions?materialTypeId=${req?.materialTypeId}`;
    if (form?.fromDate !=null) {
      url = url + `&fromDate=${req?.fromDate}&toDate=${req?.toDate}`;
    }
    return this.HttpClient.get<any>(url);
  }

  editTransactions(transactions) { 
    let Transactionss = {
      id: transactions?.id,
      transactionDate: transactions?.transactionDate ? moment(transactions?.transactionDate).format("YYYY-MM-DD HH:mm:ss"): null,
      materialTypeId: transactions?.materialTypeId,
      serialNumber: transactions?.serialNumber,
      quantity: transactions?.quantity,
      createdDate: transactions?.createdDate
    };
    return this.HttpClient.put<any>(this.pathUrl + `/InTransactions`, Transactionss);
  }

  addTransactions(transactions) {
    let Transactionss = {
      id: transactions?.id,
      transactionDate: transactions?.transactionDate ? moment(transactions?.transactionDate).format("YYYY-MM-DD HH:mm:ss"): null,
      materialTypeId: transactions?.materialTypeId,
      serialNumber: transactions?.serialNumber,
      quantity: transactions?.quantity,
    };
    return this.HttpClient.post<any>(this.pathUrl + `/InTransactions`, Transactionss);
  }

  deleteTransactions(id) { 
    return this.HttpClient.delete<any>(this.pathUrl + `/InTransactions?id=${id}`);

  }

}

