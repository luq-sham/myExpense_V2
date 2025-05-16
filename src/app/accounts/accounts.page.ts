import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonNote, IonCardHeader, IonList, IonCard, IonItem, IonIcon, IonLabel, IonSkeletonText } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonLabel, IonIcon, IonItem, IonCard, IonList, IonCardHeader, IonNote, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class AccountsPage {
  accounts: any[] = [];
  isLoading: boolean = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    const param = {
      user_id: localStorage.getItem('token')
    };

    this.api.postAccountByUser(param).subscribe(res => {
      this.accounts = res.return_data;
      this.isLoading = false;
    });
  }
}

