import { Component, OnInit, Query } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonNote, IonList, IonCard, IonItem, IonIcon, IonLabel, IonSkeletonText, IonAvatar, IonFab, IonFabButton, } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { AddComponent } from '../forms/add/add.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [ IonFabButton, IonFab, IonAvatar, IonSkeletonText, IonLabel, IonIcon, IonItem, IonCard, IonList, IonNote, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class AccountsPage {
  accounts: any[] = [];
  isLoading: boolean = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private modal: ModalController
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

  async addAccount() {
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
        this.getAccount();
      }
    }
}

