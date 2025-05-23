import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonRouterOutlet,
  IonHeader,
  IonFooter,
} from '@ionic/angular/standalone';
import { AlertService } from './services/alert.service';
import { filter } from 'rxjs/operators';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { ToastService } from './services/toast.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonHeader,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonLabel,
    IonList,
    IonMenuToggle,
    IonIcon,
    IonItem,
    IonRouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  private lastTimeBackPress = 0;
  private timePeriodToExit = 2000; // 2 seconds

  allowedPaths: string[] = ['/login', '/register'];
  display: boolean = false;

  fname: string = '';
  lname: string = '';
  email: string = '';

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'stats-chart' },
    { title: 'Transactions', url: '/transactions', icon: 'list' },
    { title: 'Accounts', url: '/accounts', icon: 'wallet' },
    { title: 'Budgets', url: '/budgets', icon: 'calculator' },
    { title: 'Savings Goals', url: '/.', icon: 'flag', comingSoon: true },
    { title: 'Reports', url: '/.', icon: 'bar-chart', comingSoon: true },
  ];

  constructor(
    private router: Router,
    private alert: AlertService,
    private platform: Platform,
    private toast: ToastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const isDesktop = this.platform.is('desktop');
      if (!isDesktop) {
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setStyle({ style: Style.Dark });
        StatusBar.setBackgroundColor({ color: '#264653' });
        StatusBar.show();
        App.addListener('backButton', () => {
          if ( this.router.url === '/dashboard' || this.router.url === '/' || this.router.url === '/login') {
            const currentTime = new Date().getTime();
            if (currentTime - this.lastTimeBackPress < this.timePeriodToExit) {
              App.exitApp();
            } else {
              this.toast.customToast('Please press back again', 2000, 'light');
              this.lastTimeBackPress = currentTime;
            }
          } else {
            window.history.back(); // Navigate back
          }
        });
      }
    });
  }

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.display = !this.allowedPaths.includes(event.urlAfterRedirects);
        this.loadUserDetails();
    });
  }

  loadUserDetails() {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      this.fname = userDetails.first_name;
      this.lname = userDetails.last_name;
      this.email = userDetails.email;
    } else {
      this.fname = '';
      this.lname = '';
      this.email = '';
    }
  }

  async comingSoon(page: any) {
    if (page.comingSoon) {
      this.alert.customAlert('Coming Soon','This feature is not available yet. Kindly check back later.');
    }
  }

  async logout(): Promise<void> {
    const res = await this.alert.customComfirmationAlert('Logout','Are you sure to logout','Logout','Cancel','confirm-red');
    if (res === 'confirm') {
      localStorage.clear();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  settings() {
    this.alert.customAlert('Settings','This feature is not available yet. Kindly check back later.');
  }
}