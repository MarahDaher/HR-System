import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/base.component';
import { EmployeeMaterialsService } from 'src/app/shared/proxy/employee-materials/employee-materials.service';
import { EmployessService } from 'src/app/shared/proxy/employess/employess.service';
import { AddMaterialsComponent } from '../add-materials/add-materials.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends BaseComponent implements OnInit {

  employeeId: string;
  pageType: string;
  selectedEmployee;
  selectedLeaveInfos;
  selectedMaterials;
  selectedImg;
  employeeForm: FormGroup;
  thumbFallback = 'assets/img/avatar.jpg';
  initLoading: boolean;
  employeeMaterial = [];
  showEditBtn = false;
  showLeaves = false;

  martialStatusList = [];
  countryList = [];
  cityList = [];
  emergencyRelationList = [];
  departmentList = [];
  contractTypesList = [];
  workTypesList = [];
  parentEmployeesList = [];
  citiesList = [];
  type ;
  defultDate = [];
  positionsList = [];

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employessService: EmployessService,
    private employeeMaterialsService: EmployeeMaterialsService,
    private viewContainerRef: ViewContainerRef,
    public modal: NzModalService,
  ) {
    super(injector);
  }

  get emergencyRelationControl(): FormControl {
    return this.employeeForm?.get(['emergencyRelation']) as FormControl;
  }

  get martialStatusControl(): FormControl {
    return this.employeeForm?.get(['martialStatus']) as FormControl;
  }

  get cityControl(): FormControl {
    return this.employeeForm?.get(['cityId']) as FormControl;
  }

  get countryControl(): FormControl {
    return this.employeeForm?.get(['country']) as FormControl;
  }

  get departmentControl(): FormControl {
    return this.employeeForm?.get(['department']) as FormControl;
  }

  get contractTypeControl(): FormControl {
    return this.employeeForm?.get(['contractTypeId']) as FormControl;
  }

  get hireDateControl(): FormControl {
    return this.employeeForm?.get(['hireDate']) as FormControl;
  }
  get birthDateControl(): FormControl {
    return this.employeeForm?.get(['birthDate']) as FormControl;
  }

  get workTypeControl(): FormControl {
    return this.employeeForm?.get(['workType']) as FormControl;
  }

  get employeeIdControl(): FormControl {
    return this.employeeForm?.get(['employeeId']) as FormControl;
  }

  get idControl(): FormControl {
    return this.employeeForm?.get(['id']) as FormControl;
  }

  get materialsControl(): FormControl {
    return this.employeeForm?.get(['materials']) as FormControl;
  }

  get imgControl(): FormControl {
    return this.employeeForm?.get(['imageName']) as FormControl;
  }

  get disabledControl(): FormControl {
    return this.employeeForm?.get(['disabled']) as FormControl;
  }

  get startAnnualContractDateControl(): FormControl {
    return this.employeeForm?.get(['startAnnualContractDate']) as FormControl;
  }

  get endAnnualContractDateControl(): FormControl {
    return this.employeeForm?.get(['endAnnualContractDate']) as FormControl;
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params.id;
    const employeeFormModel = {
      id: 0,
      employeeId: this.employeeId,
      firstName: null,
      lastName: null,
      birthDate: null,
      gender: null,
      positionId: null,
      email: null,
      mobile: null,
      homePhone: null,
      personalEmail: null,
      countryId: null,
      cityId: null,
      street: null,
      martialStatusId: null,
      residenceDocument: null,
      personalIdentification: null,
      universityCertification: null,
      notJudged: null,
      hireDate: null,
      departmentId: null,
      parentEmployeeId: null,
      workTypeId: 0,
      contractTypeId: 0,
      emergencyName: null,
      emergencyPhone: null,
      emergencyRelationId: 0,
      disabled: null,
      imageName: null,
      startAnnualContractDate: null,
      endAnnualContractDate: null,
      employeeEditorModels: null,
      leaveInfos: [],
      materials: [],
      code: null
    }

    let formEmployeeObj = {};
    Object.keys(employeeFormModel).forEach(key => {
      formEmployeeObj[key] = [employeeFormModel[key]];
    });

    formEmployeeObj['firstName'] = [null, [Validators.required]];
    formEmployeeObj['lastName'] = [null, [Validators.required]];
    formEmployeeObj['email'] = [null, [Validators.required]];
    formEmployeeObj['positionId'] = [null, [Validators.required]];
    formEmployeeObj['mobile'] = [null, [Validators.required]];
    formEmployeeObj['personalEmail'] = [null, [Validators.required]];
    formEmployeeObj['countryId'] = [null, [Validators.required]];
    formEmployeeObj['cityId'] = [null, [Validators.required]];
    formEmployeeObj['martialStatusId'] = [null, [Validators.required]];
    formEmployeeObj['departmentId'] = [null, [Validators.required]];
    formEmployeeObj['workTypeId'] = [null, [Validators.required]];
    formEmployeeObj['contractTypeId'] = [null, [Validators.required]];
    formEmployeeObj['emergencyName'] = [null, [Validators.required]];
    formEmployeeObj['emergencyPhone'] = [null, [Validators.required]];
    formEmployeeObj['emergencyRelationId'] = [null, [Validators.required]];
    formEmployeeObj['code'] = [null, [Validators.required]];

    if (this.route.snapshot.routeConfig.path.includes('add')) {
      this.type = 'Add Employee';
      this.showLeaves = true;
      this.showEditBtn = true;
      this.initLoading = false;
      this.getEmployeeEditorData();
    }
    if (this.route.snapshot.routeConfig.path.includes('details')) {
      this.getEmployeeDetails(this.employeeId);
      this.getEmployeeMaterials(this.employeeId);
      this.type = 'Employee Details';
      formEmployeeObj['firstName'] = [{ value: null, disabled: true }];
      formEmployeeObj['lastName'] = [{ value: null, disabled: true }];
      formEmployeeObj['email'] = [{ value: null, disabled: true }];
      formEmployeeObj['personalEmail'] = [{ value: null, disabled: true }];
      formEmployeeObj['birthDate'] = [{ value: null, disabled: true }];
      formEmployeeObj['gender'] = [{ value: null, disabled: true }];
      formEmployeeObj['street'] = [{ value: null, disabled: true }];
      formEmployeeObj['mobile'] = [{ value: null, disabled: true }];
      formEmployeeObj['emergencyName'] = [{ value: null, disabled: true }];
      formEmployeeObj['emergencyPhone'] = [{ value: null, disabled: true }];
      formEmployeeObj['emergencyRelationId'] = [{ value: null, disabled: true }];
      formEmployeeObj['martialStatusId'] = [{ value: null, disabled: true }];
      formEmployeeObj['cityId'] = [{ value: null, disabled: true }];
      formEmployeeObj['countryId'] = [{ value: null, disabled: true }];
      formEmployeeObj['departmentId'] = [{ value: null, disabled: true }];
      formEmployeeObj['hireDate'] = [{ value: null, disabled: true }];
      formEmployeeObj['workTypeId'] = [{ value: null, disabled: true }];
      formEmployeeObj['contractTypeId'] = [{ value: null, disabled: true }];
      formEmployeeObj['parentEmployeeId'] = [{ value: null, disabled: true }];
      formEmployeeObj['employeeId'] = [{ value: null, disabled: true }];
      formEmployeeObj['positionId'] = [{ value: null, disabled: true }];
      formEmployeeObj['code'] = [{ value: null, disabled: true }];

    }
    if (this.route.snapshot.routeConfig.path.includes('edit')) {
      this.getEmployeeDetails(this.employeeId);
      this.getEmployeeMaterials(this.employeeId);
      this.type = 'Edit Employee';
      this.showEditBtn = true;
    }
    this.employeeForm = this.fb.group(formEmployeeObj);
  }

  getEmployeeDetails(id) {
    this.initLoading = true;
    this.employessService.getEmployeeInfo(id).subscribe(res => {
      this.selectedEmployee = res;
      this.employeeForm.patchValue(res);
      this.selectedLeaveInfos = res?.leaveInfos;
      this.selectedMaterials = res?.materials;
      this.defultDate = res?.startAnnualContractDate ? [ moment(res?.startAnnualContractDate).format("YYYY-MM-DD") , moment(res?.endAnnualContractDate).format("YYYY-MM-DD")] : [];
      this.martialStatusList = res?.employeeEditorModels?.martialStatusList;
      this.departmentList = res?.employeeEditorModels?.departments.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.contractTypesList = res?.employeeEditorModels?.contractTypes.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.workTypesList = res?.employeeEditorModels?.workTypes.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.countryList = res?.employeeEditorModels?.countries.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.emergencyRelationList = res?.employeeEditorModels?.relations.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.parentEmployeesList = res?.employeeEditorModels?.parentEmployees.sort((a, b) => (a.fullName < b.fullName ) ? -1 : 1);;
      this.citiesList = res?.employeeEditorModels?.cities;
      this.positionsList = res?.employeeEditorModels?.positions.sort((a, b) => (a.enName < b.enName ) ? -1 : 1);;
      this.cityList = this.citiesList.filter(el => el.countryId == res?.countryId);
      this.selectedImg = `http://developmentaff-001-site1.dtempurl.com/api/Images/GetImageByName/UserProfiles%5C${res?.imageName}`;
      this.initLoading = false;
      
    });
  }

  submitForm() {
    this.employeeForm.value.materials = [];
    this.employeeForm.value.employeeEditorModels = {};
    this.employeeForm.value.hireDate = moment(this.employeeForm.value.hireDate).format("YYYY-MM-DD")
    this.initLoading = true;
    this.employessService.editEmployeeInfo(this.employeeForm.value).subscribe(res => {
      this.getEmployeeDetails(this.idControl.value);
      this.selectedEmployee = res;
      this.employeeForm.patchValue(res);
      this.utility.notification.success('Employee Details', 'Edit Successfully !');
      this.initLoading = false;
    }), (error: any) => {
      this.utility.notification.success('Employee Details', error);
      this.initLoading = false;
    };
  }

  
  getEmployeeEditorData(){
    this.employessService.GetEmployeeEditorData().subscribe(res =>{
      this.martialStatusList = res?.martialStatusList;
      this.departmentList = res?.departments;
      this.contractTypesList = res?.contractTypes;
      this.workTypesList = res?.workTypes;
      this.countryList = res?.countries;
      this.emergencyRelationList = res?.relations;
      this.parentEmployeesList = res?.parentEmployees;
      this.citiesList = res?.cities;
      this.positionsList = res?.positions;
      this.cityList = this.citiesList.filter(el => el.countryId == res?.countryId);
    });
  }


  addEmloyee(){
    this.initLoading = true;
    this.employeeForm.value.imageName = "default.jpg";
    this.employessService.addEmployee(this.employeeForm.value).subscribe(res=>{
      this.selectedEmployee = res;
      this.utility.notification.success('Add Employee', 'Add Successfully !');
      this.utility.navigate('/employee');
      this.initLoading = false;
    }), (error: any) => {
      this.utility.notification.success('Add Employee', error.message);
      this.initLoading = false;
    };
  }
  getEmployeeMaterials(id) {
    this.employeeMaterialsService.getEmployeeMaterials(id).subscribe(res => {
      this.employeeMaterial = res;
    });
  }

  addEmployeeMaterials() {
    const modal = this.modal.create({
      nzTitle: 'Add Material',
      nzContent: AddMaterialsComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.initLoading = true;
        this.getEmployeeMaterials(result?.employeeId)
      }
    });
  }

  disabledEmployeeMaterial(material) {
    this.utility.modal.confirm({
      nzTitle: 'Are You Sure? ',
      nzContent: `<b style="color: red;">This material will be disabled !!</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.disabledMaterial(material?.id)
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  disabledMaterial(id) {
    this.initLoading = true;
    this.employeeMaterialsService.deleteEmployeeMaterials(id).subscribe(res => {
      this.employeeMaterial = this.employeeMaterial.filter(el => el.id != id);
      this.utility.notification.success('Employee Material', 'Disabled Successfully !');
      this.initLoading = false;
    });
  }

  disabledEmployee() {
    this.employeeForm.value.disabled = true;
    this.submitForm();
    this.utility.notification.success('Employee Details', 'Disabled Successfully !');
    this.utility.route.navigate(['/employees']);
  }

  applyFilter(value, type) {
    switch (type) {
      case 'Range':        
        this.startAnnualContractDateControl.setValue(value[0]);
        this.endAnnualContractDateControl.setValue(value[1]);
        break;
      case 'Country':
        this.cityControl.reset();
        this.cityList = this.citiesList.filter(el => el.countryId == value);
        break;
      case 'Contract':
        this.startAnnualContractDateControl.reset();
        this.endAnnualContractDateControl.reset();
        break;

    }
  }
}
