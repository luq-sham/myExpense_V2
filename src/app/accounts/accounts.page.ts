import { Component, OnInit, Query } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonNote, IonList, IonCard, IonItem, IonIcon, IonLabel, IonSkeletonText, IonAvatar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonSkeletonText, IonLabel, IonIcon, IonItem, IonCard, IonList, IonNote, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class AccountsPage {
  accounts: any[] = [];
  isLoading: boolean = true;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    const param = {
      user_id: localStorage.getItem('token')
    };

    this.api.getAccountByUser(param).subscribe(res => {
      this.accounts = res.return_data;
      this.isLoading = false;
    });
  }

  openAccountDetails(account: any) {
    this.router.navigate(['/account-detail'], { queryParams: { id: account} });
  }
}

