import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions.page').then( m => m.TransactionsPage)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./accounts/accounts.page').then( m => m.AccountsPage)
  },
  {
    path: 'budgets',
    loadComponent: () => import('./budgets/budgets.page').then( m => m.BudgetsPage)
  },
  {
    path: 'goals',
    loadComponent: () => import('./goals/goals.page').then( m => m.GoalsPage)
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.page').then( m => m.ReportsPage)
  },
];
