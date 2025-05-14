import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonFooter } from '@ionic/angular/standalone';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonFooter, IonHeader, RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'stats-chart' },
    { title: 'Transactions', url: '/transactions', icon: 'list' },
    { title: 'Accounts', url: '/accounts', icon: 'wallet' },
    { title: 'Budgets', url: '/budgets', icon: 'calculator' },
    { title: 'Savings Goals', url: '/.', icon: 'flag', comingSoon: true},
    { title: 'Reports', url: '/.', icon: 'bar-chart', comingSoon: true},
  ];
  
  constructor(
    private alert: AlertService,
    private router: Router
  ) {}

  async comingSoon(page: any) {
    if (page.comingSoon) {
      await this.alert.customAlert('Coming Soon', 'This feature will be available in the next update');
      this.router.navigateByUrl('/', { replaceUrl: true })
    }
  }

  async settings() {
    await this.alert.customAlert('Settings', 'This feature is not available yet. Kindly check back later.');
  }
}