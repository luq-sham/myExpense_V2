import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonList, IonIcon, IonAvatar, IonSkeletonText, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: true,
  imports: [IonButton, IonSkeletonText, IonAvatar, IonIcon, IonList, IonLabel, IonItem, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class TransactionsPage {

  transactions: any[] = [];
  loadings: boolean = true;
  limit: number = 5;
  displayMore: boolean = true;

  constructor(
    private api: ApiService,
    private alert: AlertService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.getTransactionsData()
  }

  getTransactionsData(loadMore = false) {
    if(loadMore){
      this.limit += 5;
      this.loading.showLoading()
    }
    const token = {
      user_id: localStorage.getItem('token'),
      limit: this.limit,
    };
  
    this.api.getTransactionFilter(token).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          this.transactions = res.return_data;
          if(this.limit >= res.totalCount){
            this.displayMore = false;
          }
          this.loading.hide()
        }
        this.loadings = false;
      },
      error: () => {
        this.alert.customAlert('Loading Failed', 'An error has occurred. Kindly try again.(transaction)');
      },
    });
  }

}