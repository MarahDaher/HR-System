import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MaterialService } from 'src/app/shared/proxy/materials/material.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent extends BaseComponent implements OnInit {

  materialsList = [];
  initLoading = true;
  totalCount;
  constructor(
    injector: Injector,
    private viewContainerRef: ViewContainerRef,
    public modal: NzModalService,
    private materialService : MaterialService
  ) {
    super(injector)
   }

  ngOnInit(): void {
    this.getMaterial();
  }


  getMaterial(){
    this.initLoading = true;
    this.materialService.getMaterial().subscribe(res=>{
      this.materialsList = res;
      this.totalCount = this.materialsList.length;
      this.initLoading = false;
    });
  }


  addMaterials(material?){
    const modal = this.modal.create({
      nzTitle: material ? 'Edit Materials' : 'Add Materials',
      nzContent: AddMaterialComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams : {
        editMaterial : material
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {      
      if (result) {
        if (material?.id) {
          Object.assign(material, result);
        } else {
          this.initLoading = true;
          this.materialsList = [];
          this.getMaterial();
        }
      }
    });
  }

  showConfirmDelete(data){
    this.utility.modal.confirm({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This material will be deleted !!</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteMaterial(data?.id)
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  deleteMaterial(id){
    this.initLoading = true;
    this.materialService.deleteMaterial(id).subscribe(res=>{
      this.materialsList = this.materialsList.filter(el => el.id != id);
      this.utility.notification.success( 'Material' ,'Deleted Successfully !');
      this.initLoading = false;
    })
  }

}
