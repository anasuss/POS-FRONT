import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menuBar: MenuItem[] | undefined;
  sideBar: MenuItem[] | undefined;

  sidebarVisible: boolean = false;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.sideBar = [
      { label: 'Employees', icon: PrimeIcons.USERS, routerLink: '/employees' },
    ];
    this.menuBar = [
      {
        icon: PrimeIcons.ALIGN_JUSTIFY,
        command: () => {
          this.sidebarVisible = !this.sidebarVisible;
        },
      },
      {
        label: 'Logout',
        icon: PrimeIcons.SIGN_OUT,
      },
    ];
  }
}
