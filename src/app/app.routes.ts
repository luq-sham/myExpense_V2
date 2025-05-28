import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate:[authGuard],
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'transactions',
    canActivate:[authGuard],
    loadComponent: () => import('./transactions/transactions.page').then( m => m.TransactionsPage)
  },
  {
    path: 'accounts',
    canActivate:[authGuard],
    loadComponent: () => import('./accounts/accounts.page').then( m => m.AccountsPage)
  },
  {
    path: 'budgets',
    canActivate:[authGuard],
    loadComponent: () => import('./budgets/budgets.page').then( m => m.BudgetsPage)
  },
  {
    path: 'goals',
    canActivate:[authGuard],
    loadComponent: () => import('./goals/goals.page').then( m => m.GoalsPage)
  },
  {
    path: 'reports',
    canActivate:[authGuard],
    loadComponent: () => import('./reports/reports.page').then( m => m.ReportsPage)
  },
  {
    path: 'login',
    canActivate:[loginGuard],
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    canActivate:[loginGuard],
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
  // {
  //   path: 'error-message',
  //   loadComponent: () => import('./components/error-message/error-message.page').then( m => m.ErrorMessagePage)
  // },
  {
    path: 'budget-detail',
    canActivate:[authGuard],
    loadComponent: () => import('./details/budget-detail/budget-detail.page').then( m => m.BudgetDetailPage)
  },
  {
    path: 'transaction-detail',
    canActivate:[authGuard],
    loadComponent: () => import('./details/transaction-detail/transaction-detail.page').then( m => m.TransactionDetailPage)
  },
  {
    path: 'account-detail',
    canActivate:[authGuard],
    loadComponent: () => import('./details/account-detail/account-detail.page').then( m => m.AccountDetailPage)
  },
];
