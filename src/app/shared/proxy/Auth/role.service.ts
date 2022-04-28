
import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseComponent implements CanActivate {

  constructor(
    injector: Injector,
  ) { super(injector) }


  canActivate(route: ActivatedRouteSnapshot): boolean {

    var token = localStorage.getItem("token");
    
    if (token) {
      return true
    } else {
      this.utility.navigate(`/error`);
      return false
    }
  }

}
