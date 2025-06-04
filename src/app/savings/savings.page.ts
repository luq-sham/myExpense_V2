import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonProgressBar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ModalController } from '@ionic/angular/standalone';
import { AddComponent } from '../forms/add/add.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.page.html',
  styleUrls: ['./savings.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonProgressBar,
    IonIcon,
    IonFabButton,
    IonFab,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class SavingsPage implements OnInit {
  savingsData: any[] = [];

  constructor(
    private modalController: ModalController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.getSavingsData();
  }

  getSavingsData() {
    const param = {
      user_id: localStorage.getItem('token') || '',
    };
    this.api.getSavings(param).subscribe({
      next: (res) => {
        this.savingsData = res.return_data || [];
      },
      error: (err) => {
        console.error('Error fetching savings data:', err);
      },
    });
  }

  async addSavings() {
    const modal = await this.modalController.create({
      component: AddComponent,
      backdropDismiss: true,
      componentProps: {
        title: 'Add Savings',
        formID: '4',
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.getSavingsData();
    }
  }
}
