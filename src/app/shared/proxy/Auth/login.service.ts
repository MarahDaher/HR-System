import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseComponent {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  login(form) {
    let req = {
      userName: form?.userName,
      password: form?.password
    }
    return this.HttpClient.post(this.pathUrl + "/Auth/Login", req);
  }

  register(form){
    let req = {
      userName: form?.userName,
      password: form?.password
    }    
    return this.HttpClient.post(this.pathUrl + "/Auth/Register", req);
  }

  LoginByCode(code) {
    return this.HttpClient.post<any>(this.pathUrl + `/Auth/LoginByEmployeeCode?employeeCode=${code}`, code);
  }

}
