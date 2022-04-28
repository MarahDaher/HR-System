import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { LoginService } from 'src/app/shared/proxy/Auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false
  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder,
    private loginService: LoginService

  ) {
    super(injector);
    this.registerForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  ngOnDestroy() {
  }


  register(form) {
    this.loading = true;
    this.loginService.register(form).subscribe((res) => {
      this.loading = false;
      this.utility.notification.success('Register', 'User Registration Successful!');
      this.utility.route.navigate(['/login']);
    }), (err) => {
      this.utility.notification.error('Register', err.error?.message?.m_StringValue)
      this.loading = false;

    };
  }


}