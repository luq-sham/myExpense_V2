import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonContent, IonCardContent, IonRow, IonCol, IonIcon, IonAvatar, IonSkeletonText, IonItem, IonLabel, IonNote, IonList, IonProgressBar, IonCardHeader, IonCardTitle, IonRippleEffect, IonGrid, IonRefresher, IonRefresherContent, IonBadge } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';
import { ApiService } from '../services/api.service';

import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ModalController} from '@ionic/angular/standalone'
import { AddComponent } from '../forms/add/add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonBadge, IonRefresherContent, IonRefresher,  IonGrid, IonRippleEffect, IonCardTitle, IonCardHeader, IonProgressBar, IonList, IonNote, IonLabel, IonItem,  IonSkeletonText,  IonAvatar, IonIcon, IonCol, IonRow, IonCardContent, IonCard, IonContent, CommonModule, FormsModule, HeaderComponent, FabComponent],
})
export class DashboardPage {
  doughnutChart: any;
  data: any[] = [];
  password: string = '';
  email: string = '';
  param: any = {};
  dataCerdencial: any;

  loading_account: boolean = true;
  loading_transaction: boolean = true;
  loading_budget: boolean = true;
  
  account_list: any[] = [];
  transactions: any[] = [];
  budgets: any[] = [];
  
  acc_id: any = '';


  constructor(
    private menu: MenuController,
    private router: Router,
    private api: ApiService,
    private alert: AlertService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading_account = true;
    this.loading_transaction = true;
    this.loading_budget = true;

    const token = {
      user_id: localStorage.getItem('token'),
    };
    
    // Accounts API
    this.api.postAccountByUser(token).subscribe({
      next: async (res) => {
        if (res.status_code == 200){
          this.loading_account = false;
          this.account_list = res.return_data;
        }
      },
      error: async () => {
        this.alert.customAlert(
          'Loading Failed',
          'An error has occurred. Kindly try again.(account)'
        );
      }
    })

    // Transactions API
    this.api.getTransaction(token).subscribe({
      next: async (res) => {
        if (res.status_code == 200) {
          this.loading_transaction = false;
          this.transactions = res.return_data;
        }
      },
      error: async () => {
        this.alert.customAlert(
          'Loading Failed',
          'An error has occurred. Kindly try again.(transaction)'
        );
      },
    })

    // Budgets API
    this.api.getBudgetByUser(token).subscribe({
      next: async (res) => {
        if (res.status_code == 200) {
          this.loading_budget = false;
          this.budgets = res.return_data;
        }
      },
      error: async () => {
        this.alert.customAlert(
          'Loading Failed',
          'An error has occurred. Kindly try again.(budget)'
        );
      },
    })
  }

  async addAccount(){
    const param = {
      formID: 1,
      title: 'New Account',
    };
    const modal = await this.modal.create({
      component: AddComponent,
      componentProps: param,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.getData();
    }
  }

  openBudget(budget: any) {
    console.log(budget);
  }

  getProgressColor(budget: any): string {
    const progress = budget.used_amount / budget.amount;
    if (progress < 0.5) 
      return 'success';
    else if (progress < 0.9) 
      return 'warning';
    else return 'danger';
  }
  
  transactionsList(){
    this.router.navigate(['/transactions']);
  }

  budgetsList(){
    this.router.navigate(['/budgets']);
  }
  
  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      window.location.reload();
    }, 1000);
  }

  ionViewDidEnter(): void {
    this.menu.enable(true);
  }
}
