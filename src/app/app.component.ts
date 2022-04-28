import { Component, Injector, OnInit } from '@angular/core';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { BaseComponent } from './shared/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'argon-dashboard-angular';


  constructor(
    injector: Injector,
    private i18n: NzI18nService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('token');
        if (token == undefined) {
          // Perform logout
          //Navigate to login/home
          this.utility.navigate('/login');
        }
      }
    });
  }


  ngAfterViewInit() {
    this.setLocalization()
  }

  setLocalization() {
    this.i18n.setLocale(en_US);
  }


}
