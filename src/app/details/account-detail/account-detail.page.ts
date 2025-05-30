import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonCard, IonCardContent, IonAvatar, IonLabel, IonBadge, IonList, IonItem, IonSkeletonText, } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
// import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
  standalone: true,
  imports: [ IonSkeletonText, IonItem, IonList, IonBadge, IonLabel, IonAvatar, IonCardContent, IonCard, IonIcon, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ],
})
export class AccountDetailPage implements OnInit {
  accountId: any;
  accDetails: any;
  transactions: any;
  displayMore: boolean = true;
  limit: number = 5;

  loading_transaction: boolean = true;

  @ViewChild('lineBalance', { static: false })
  lineBalance!: ElementRef<HTMLCanvasElement>;
  lineBalanceChart: any;

  constructor(
    private router: ActivatedRoute,
    private api: ApiService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe((param) => {
      this.accountId = param['id'];
    });
    const params = {
      accountID: this.accountId,
    };
    this.api.getAccountByID(params).subscribe((res) => {
      this.accDetails = res.return_data;
    });
    this.getTransactionsData();
    // this.api.getAccountChart(params).subscribe((res) => {
    //   this.renderChart(res.labels, res.data);
    // });
  }

  getTransactionsData(loadMore = false) {
    if (loadMore) {
      this.limit += 5;
      this.loading.showLoading();
    }
    const params = {
      accountID: this.accountId,
      limit: this.limit,
    };
    this.api.getTransactionByAccount(params).subscribe((res) => {
      if (this.limit >= res.totalCount) {
        this.displayMore = false;
      }
      this.loading.hide();
      this.transactions = res.return_data;
      this.loading_transaction = false;
    });
  }

  // renderChart(labels: any, data: any) {
  //   this.lineBalanceChart = new Chart(this.lineBalance.nativeElement, {
  //     type: 'line',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Balance',
  //           data: data,
  //           fill: true,
  //           borderColor: 'rgb(75, 192, 192)',
  //           tension: 0.1,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       interaction: {
  //         mode: 'index',
  //         intersect: false,
  //       },
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'bottom',
  //           labels: {
  //             color: '#555',
  //             font: {
  //               size: 12,
  //               weight: 'bold',
  //             },
  //             padding: 20,
  //             usePointStyle: true,
  //             pointStyle: 'circle',
  //           },
  //         },
  //         tooltip: {
  //           backgroundColor: '#f5f5f5',
  //           titleColor: '#007bff',
  //           bodyColor: '#333',
  //           borderColor: '#ccc',
  //           borderWidth: 1,
  //           padding: 10,
  //           callbacks: {
  //             label: function (context) {
  //               return `${context.dataset.label}: RM ${context.parsed.y.toFixed(
  //                 2
  //               )}`;
  //             },
  //           },
  //         },
  //       },
  //       elements: {
  //         point: {
  //           radius: 6,
  //           backgroundColor: '#fff',
  //           borderColor: '#007bff',
  //           borderWidth: 2,
  //           hoverRadius: 9,
  //         },
  //         line: {
  //           borderWidth: 2,
  //           // Smooth curve
  //         },
  //       },
  //       scales: {
  //         x: {
  //           ticks: {
  //             color: '#555',
  //             font: {
  //               size: 12,
  //             },
  //             callback: function (value: any, index: number, ticks: any) {
  //               // Format x-axis label as day (Mon, Tue, etc.)
  //               const label = this.getLabelForValue
  //                 ? this.getLabelForValue(value)
  //                 : value;
  //               // Try to parse label as date
  //               const date = new Date(label);
  //               if (!isNaN(date.getTime())) {
  //                 return date.toLocaleDateString('en-US', {
  //                   weekday: 'short',
  //                 });
  //               }
  //               return label;
  //             },
  //           },
  //           grid: {
  //             display: false,
  //           },
  //         },
  //         y: {
  //           ticks: {
  //             callback: function (value) {
  //               return `RM ${value}`;
  //             },
  //             color: '#555',
  //             font: {
  //               size: 12,
  //             },
  //           },
  //           grid: {
  //             color: '#eee',
  //           },
  //         },
  //       },
  //     },
  //   });
  // }
}
