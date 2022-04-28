import { Component, OnInit, ElementRef, Injector } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user;

  constructor(injector: Injector, location: Location, private element: ElementRef, private router: Router, private route: ActivatedRoute,
  ) {
    super(injector);
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.user = localStorage.getItem('userName');;

  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
      if (this.listTitles[item].path === titlee || titlee.includes('details')) {
        return this.listTitles[item].title + " " + 'Details'
      }
    }

    return 'Dashbord';
  }


  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    this.utility.route.navigate(['/account/login']);
  }

}
