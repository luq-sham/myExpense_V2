import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonContent, IonCardContent, IonRow, IonCol, IonIcon, IonAvatar, IonSkeletonText, IonItem, IonLabel, IonNote, IonList, IonProgressBar, IonCardHeader, IonCardTitle, IonRippleEffect, IonGrid, } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';

import {Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [ IonGrid, IonRippleEffect, IonCardTitle, IonCardHeader, IonProgressBar, IonList, IonNote, IonLabel, IonItem,  IonSkeletonText,  IonAvatar, IonIcon, IonCol, IonRow, IonCardContent, IonCard, IonContent, CommonModule, FormsModule, HeaderComponent],
})
export class DashboardPage implements OnInit {
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
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
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

  
  ionViewDidEnter(): void {
    this.menu.enable(true);
  }
  
  transactionsList(){
    this.router.navigate(['/transactions']);
  }
  budgetsList(){
    this.router.navigate(['/account-list'], {
      queryParams: { type: 'budget' },
    });;
  }
  
  // printContent() {
  //   const contentElement = document.getElementById('print-section');
  //   const content = `
  //     <html>
  //       <body>
  //         ${contentElement?.outerHTML || ''}
  //       </body>
  //     </html>
  //   `;
  
  //   if (Capacitor.getPlatform() === 'web') {
  //     // Web fallback
  //     const printWindow = window.open('', '', 'width=800,height=600');
  //     if (printWindow) {
  //       printWindow.document.write(content);
  //       printWindow.document.close();
  //       printWindow.focus();
  //       printWindow.print();
  //     }
  //   } else {
  //     // Native
  //     const options: PrintOptions = {
  //       name: 'Test Print',
  //     };
  
  //     this.printer.print(content, options).then(
  //       () => console.log('Print successful'),
  //       (err) => console.error('Print failed:', err)
  //     );
  //   }
  // }
}
