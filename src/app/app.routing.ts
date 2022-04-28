import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/proxy/Auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      // },
      {
        path: 'employees',
        loadChildren: () => import('src/app/pages/employees/employees.module').then(m => m.EmployeesModule),
      },
      {
        path: 'employee-attendance',
        loadChildren: () => import('src/app/pages/employee-attendance/employee-attendance.module').then(m => m.EmployeeAttendanceModule),
      },
      {
        path: 'employee-leaves',
        loadChildren: () => import('src/app/pages/employee-leaves/employee-leaves.module').then(m => m.EmployeeLeavesModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('src/app/pages/notifications/notifications.module').then(m => m.NotificationsModule),
      },
      {
        path: 'materials',
        loadChildren: () => import('src/app/pages/materials/materials.module').then(m => m.MaterialsModule),
      },
      {
        path: 'transactions',
        loadChildren: () => import('src/app/pages/transactions/transactions.module').then(m => m.TransactionsModule),
      },
      {
        path: 'error',
        loadChildren: () => import('src/app/pages/error/error.module').then(m => m.ErrorModule),
      },
    ]
  }
  , {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
