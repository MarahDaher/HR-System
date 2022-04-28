import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { LoginService } from 'src/app/shared/proxy/Auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false
  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder,
    private loginService: LoginService

  ) {
    super(injector);
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


  LoginForm(form) {
    this.loading = true;
    this.loginService.login(form).subscribe((res:any) => {
      this.AuthService.setToken(res?.token),
      this.AuthService.setUserName(form?.userName)
      this.utility.route.navigate(['/employee-attendance']);
      this.loading = false
    } , (err) => {
      this.utility.notification.error('Login', err.error.message + '\n UserName or Password incorrect')
      this.loading = false
    });
  }

}
