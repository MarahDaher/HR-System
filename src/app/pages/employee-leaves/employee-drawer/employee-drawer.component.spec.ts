import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDrawerComponent } from './employee-drawer.component';

describe('EmployeeDrawerComponent', () => {
  let component: EmployeeDrawerComponent;
  let fixture: ComponentFixture<EmployeeDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
