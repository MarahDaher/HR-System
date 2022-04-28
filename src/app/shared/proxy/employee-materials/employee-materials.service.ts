import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeMaterialsService extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  getEmployeeMaterials(id){
    return this.HttpClient.get<any>(this.pathUrl + `/EmployeeMaterials?employeeId=${id}`);
  }
  
  addEmployeeMaterials(material){
    let materials = {
        employeeId: material?.employeeId,
        materialTypeId: material?.materialTypeId,
        inTransactionId: material?.inTransactionId,
        quantity: material?.quantity,
        notes: material?.notes,
        createdDate:  moment(material?.createdDate).format("YYYY-MM-DD HH:mm:ss")
    };
    return this.HttpClient.post<any>(this.pathUrl + `/EmployeeMaterials` , materials);
  }

  deleteEmployeeMaterials(id){
    return this.HttpClient.delete<any>(this.pathUrl + `/EmployeeMaterials?id=${id}`);
  }
}
