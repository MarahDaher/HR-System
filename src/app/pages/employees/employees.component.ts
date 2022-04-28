import { Component, Injector, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base.component';
import { EmployessService } from 'src/app/shared/proxy/employess/employess.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends BaseComponent implements OnInit {

  //region variables
  employeesList:any = [];
  initLoading: boolean;
  searchTerm: string | null = null;
  searchTerm$ = new Subject();
  
  constructor(
    injector: Injector,
    private employessService : EmployessService,
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllEmployess();

    this.searchTerm$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((searchText: string) => {
      if (searchText) {
        this.employeesList = this.employeesList.filter(res => {
          return res.fullName.toLocaleLowerCase().includes(searchText);
        })
        this.initLoading = false;
      } else {
        this.getAllEmployess();
      }
    });
  }

  getAllEmployess(){
    this.initLoading = true;
    this.employessService.getAllEmployess().subscribe(res=>{
      this.employeesList = res.sort((a, b) => (a.fullName < b.fullName ) ? -1 : 1)
      this.initLoading = false;
    });
  }

  search(ev?) {
    this.initLoading = true
    const searchText = ev ? (ev.target as HTMLInputElement).value : null;
    this.searchTerm$.next(searchText)
  }

  addEmployee(){}

}
