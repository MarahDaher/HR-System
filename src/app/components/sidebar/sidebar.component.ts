import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base.component';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/employees', title: 'Employees',  icon:'ni-single-02 text-white', class: '' },
    { path: '/employee-attendance', title: 'Employee Attendance',  icon:'ni-watch-time text-white', class: '' },
    { path: '/employee-leaves', title: 'Employee Leaves',  icon:'ni-user-run text-white', class: '' },

];

export const ROUTES2: RouteInfo[] = [
  { path: '/notifications', title: 'Notifications',  icon:'ni-bell-55 text-white', class: '' },
  { path: '/materials', title: 'Materials',  icon:'ni-bullet-list-67 text-white', class: '' },
  { path: '/transactions', title: 'Transactions',  icon:'ni-cart text-white', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  public menuItems2: any[];
  public isCollapsed2 = true;

  constructor(
    injector: Injector,
    private router: Router) { 
      super(injector)
    }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

   this.menuItems2 = ROUTES2.filter(menuItem => menuItem);
   this.router.events.subscribe((event) => {
     this.isCollapsed2 = true;
  });
  }


  logout() {
    localStorage.removeItem('token')
    this.utility.route.navigate(['/account/login']);
  }
}
