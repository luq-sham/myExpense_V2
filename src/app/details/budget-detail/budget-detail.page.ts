import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCardContent,
  IonCard,
  IonProgressBar,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonIcon,
  IonText,
  IonButton, IonSkeletonText } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.page.html',
  styleUrls: ['./budget-detail.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, 
    IonButton,
    IonText,
    IonIcon,
    IonBackButton,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonProgressBar,
    IonCard,
    IonCardContent,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class BudgetDetailPage implements OnInit {
  id: any;
  detailsData: any;
  loading_chart = true

  @ViewChild('lineCanvas', { static: false })
  lineCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getBudgetData();
  }

  getBudgetData() {
    this.route.queryParams.subscribe((param) => {
      this.id = {
        budget_id: param['id'],
      };
    });
    this.api.getBudgetByID(this.id).subscribe((res) => {
      this.loading_chart = false;
      this.detailsData = res.return_data;
      this.renderChart(this.detailsData?.budget_category, this.detailsData?.id);
    });
  }

  renderChart(budget_category: any, budget_id: any) {
    const payload = {
      user_id: localStorage.getItem('token'),
      budget_id: budget_id,
      budget_category: budget_category,
    };

    this.api.getBudgetLineChart(payload).subscribe((data) => {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${
                    context.dataset.label
                  }: RM${context.parsed.y.toFixed(2)}`;
                },
              },
            },
          },
          elements: {
            point: {
              radius: 5,
              backgroundColor: 'white',
              borderColor: '#007bff',
              borderWidth: 2,
              hoverRadius: 7,
            },
            line: {
              borderWidth: 3,
            },
          },
        },
      });
    });
  }

  getProgressColor(amount: any, total: any): string {
    const progress = amount / total;
    if (progress < 0.5) return 'success';
    else if (progress < 0.9) return 'warning';
    else return 'danger';
  }
}
