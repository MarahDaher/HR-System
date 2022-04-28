import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';
import { MaterialService } from 'src/app/shared/proxy/materials/material.service';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent extends BaseComponent implements OnInit {

  @Input() editMaterial;
  filterForm: FormGroup;
  initLoading = false;

  constructor(
    injector : Injector,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private materialService : MaterialService
  ) { 
    super(injector);
  }

  ngOnInit(): void {

    const filterModal = {
      id: 0,
      enName: null,
      arName: null,
      createdDate: null,
    };

    let filterObj = {};
    Object.keys(filterModal).forEach(key => {
      filterObj[key] = [filterModal[key]];
    });

    this.filterForm = this.fb.group(filterObj);

    if(this.editMaterial){
      this.filterForm.patchValue(this.editMaterial);
    }
    
  }

  submitForm(form: any) {
    this.initLoading = true;
    if(!this.editMaterial){
      this.materialService.addMaterial(form).subscribe((res: any) => {
        this.utility.notification.success('Add Material', 'Add Successfully');
        this.modal.close(form); 
        this.initLoading = false;
      }, (error: any) => {
          this.utility.notification.error('Add Material', 'Check The Date');
          this.initLoading = false;
      });
    }
    else {
      this.materialService.editMaterial(form).subscribe((res: any) => {
        this.utility.notification.success('Edit Material', 'Add Successfully');
        this.modal.close(form); 
        this.initLoading = false;
      }), (error: any) => {
          this.utility.notification.error('Edit Leaves', 'Check The Date');
          this.initLoading = false;
      };
    }

  }

  handleCancel(): void {
    this.modal.close();
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => this.range(0, 24).splice(17, 20),
    nzDisabledMinutes: () => this.range(0, 0),
    nzDisabledSeconds: () => [55, 56]
  });

}
