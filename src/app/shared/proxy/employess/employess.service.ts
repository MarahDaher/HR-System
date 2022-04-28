import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Injectable({
  providedIn: 'root'
})
export class EmployessService  extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }


  getAllEmployess(){
    return this.HttpClient.get<any>(this.pathUrl + "/Employees/GetEmployeeHeaders");
  }

  getEmployeeInfo(id){
    return this.HttpClient.get<any>(this.pathUrl + `/Employees/GetFullEmployeeInfo/${id}`);
  }

  addEmployee(employee){
    return this.HttpClient.post<any>(this.pathUrl + `/Employees` , employee);
  }

  GetEmployeeEditorData(){
    return this.HttpClient.get<any>(this.pathUrl + `/Employees/GetEmployeeEditorData`);
  }

  editEmployeeInfo(form){
    return this.HttpClient.put<any>(this.pathUrl + `/Employees` , form);
  }

  getEmployessImage(image){
    return this.HttpClient.get(this.pathUrl + `/Images/GetImageByName/UserProfiles%5C${image}` , { responseType: 'blob' });
  }
}
