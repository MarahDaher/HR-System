import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './materials.component';
import { AppNgZorroAntdModule } from 'src/app/app-ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsRoutingModule } from './materials-routing.module';
import { AddMaterialComponent } from './add-material/add-material.component';



@NgModule({
  declarations: [
    MaterialsComponent,
    AddMaterialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgZorroAntdModule,
    MaterialsRoutingModule
  ],
  exports: [
    AddMaterialComponent,
    MaterialsComponent
  ]
})
export class MaterialsModule { }
