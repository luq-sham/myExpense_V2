import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonItem, IonList, IonLabel, IonSkeletonText, IonNote, IonProgressBar, IonBadge, IonChip } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ModalController } from '@ionic/angular/standalone'
import { AddComponent } from '../forms/add/add.component';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
  imports: [IonChip, IonBadge, IonProgressBar, IonNote, IonSkeletonText, IonLabel, IonList, IonItem, IonFabList, IonIcon, IonFabButton, IonFab, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class BudgetsPage implements OnInit {
  loading_budget: boolean = true;
  budgets: any[] = [];


  constructor(
    private modalController: ModalController,
    private alert: AlertService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    const token = {
      user_id: localStorage.getItem('token'),
    };
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

  async addBudget(){
    let param={
      formID:3,
      title:'New Budget'
    }
    const modal = await this.modalController.create({
      component:AddComponent,
      componentProps:param
    })

    await modal.present()
    
    const { data } = await modal.onDidDismiss()

    if(data){
      this.getData()
    }
  }

  openBudget(budget: any) {
    this.router.navigate(['/budget-detail'], { queryParams: { id: budget.id } });
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
}
