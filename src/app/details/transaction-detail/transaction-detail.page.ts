import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonBackButton, IonItem, IonLabel, IonCardContent, IonList, IonCardHeader, IonCardTitle, IonCard, IonSkeletonText } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

interface Transaction {
  transaction_type: string;
  transaction_category: string;
  transaction_description: string;
  user_id: string;
  transaction_amount: number;
  transaction_date: string;
  id: string;
  account_name: string;
  icon: string;
}

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonCard, IonCardTitle, IonCardHeader, IonList, IonCardContent, IonLabel, IonItem,  IonBackButton, IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ],
})
export class TransactionDetailPage implements OnInit {
  transaction_id: any;
  transaction: Transaction | undefined;
  isLoading = true;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.transaction_id = params['id'];
    });
    this.getTransactionData();
  }

  getTransactionData() {
    const data = {
      transactionID: this.transaction_id,
    };

    this.api.getTransactionByID(data).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          this.transaction = res.return_data;
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching transaction details:', err);
      },
    });
  }
}
