import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardContent, IonCard, IonProgressBar, IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton, IonIcon, IonText, IonButton, IonSkeletonText, IonChip, IonBadge, IonCardHeader, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.page.html',
  styleUrls: ['./budget-detail.page.scss'],
  standalone: true,
  imports: [IonToggle,  IonLabel, IonCardHeader, IonBadge, IonChip, IonSkeletonText, IonButton, IonText, IonIcon, IonBackButton, IonTitle, IonButtons, IonToolbar, IonHeader, IonProgressBar, IonCard, IonCardContent, IonContent, CommonModule, FormsModule, ],
})
export class BudgetDetailPage implements OnInit {
  id: any;
  detailsData: any;
  loading_chart = true;

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
      this.detailsData = res.return_data;
      this.renderChart(this.detailsData?.budget_category, this.detailsData?.id);
      this.loading_chart = false;
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
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: 'Budget Trend Over Time',
              font: {
                size: 20,
                weight: 'bold',
                family: 'Arial',
              },
              color: '#333',
              padding: {
                top: 10,
                bottom: 30,
              },
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: '#555',
                font: {
                  size: 12,
                  weight: 'bold',
                },
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            tooltip: {
              backgroundColor: '#f5f5f5',
              titleColor: '#007bff',
              bodyColor: '#333',
              borderColor: '#ccc',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function (context) {
                  return `${
                    context.dataset.label
                  }: RM ${context.parsed.y.toFixed(2)}`;
                },
              },
            },
          },
          elements: {
            point: {
              radius: 6,
              backgroundColor: '#fff',
              borderColor: '#007bff',
              borderWidth: 2,
              hoverRadius: 9,
            },
            line: {
              borderWidth: 2,
              // Smooth curve
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#555',
                font: {
                  size: 12,
                },
                callback: function (value: any, index: number, ticks: any) {
                  // Format x-axis label as day (Mon, Tue, etc.)
                  const label = this.getLabelForValue
                    ? this.getLabelForValue(value)
                    : value;
                  // Try to parse label as date
                  const date = new Date(label);
                  if (!isNaN(date.getTime())) {
                    return date.toLocaleDateString('en-US', {
                      weekday: 'short',
                    });
                  }
                  return label;
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                callback: function (value) {
                  return `RM ${value}`;
                },
                color: '#555',
                font: {
                  size: 12,
                },
              },
              grid: {
                color: '#eee',
              },
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

  changeStatus(event: any) {
    const payload = {
      budget_id: this.detailsData.id,
      notice: event.detail.checked,
    };
    this.api.postUpdateBudgetNotice(payload).subscribe((res) => {
      if (res.status === 'success') {
        this.getBudgetData();
      }
    });
  }
}
