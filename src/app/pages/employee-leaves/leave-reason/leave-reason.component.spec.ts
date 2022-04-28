import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReasonComponent } from './leave-reason.component';

describe('LeaveReasonComponent', () => {
  let component: LeaveReasonComponent;
  let fixture: ComponentFixture<LeaveReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
