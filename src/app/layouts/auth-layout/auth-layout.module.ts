import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    AppNgZorroAntdModule
    // NgbModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ]
})
export class AuthLayoutModule { }
