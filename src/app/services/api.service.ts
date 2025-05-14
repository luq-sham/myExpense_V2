import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  postRegisterUsers(data: any): Observable<any> {
    const api = this.url + 'api/register';
    return this.http.post(api, data);
  }

  postLoginUsers(data: any): Observable<any> {
    const api = this.url + 'api/login';
    return this.http.post(api, data);
  }

  getAccountType(): Observable<any> {
    const api = this.url + 'api/get_acc_type';
    return this.http.get(api);
  }

  getAccount(): Observable<any> {
    const api = this.url + 'api/get_acc';
    return this.http.get(api);
  }

  postAccountByUser(data: any): Observable<any> {
    const api = this.url + 'api/get_acc_by_user';
    return this.http.post(api, data);
  }

  postAddAccount(data: any): Observable<any> {
    const api = this.url + 'api/post_add_acc';
    return this.http.post(api, data);
  }

  getTransactionCategories(): Observable<any> {
    const api = this.url + 'api/get_categories';
    return this.http.get(api);
  }

  postAddTransaction(data: any): Observable<any> {
    const api = this.url + 'api/post_add_transaction';
    return this.http.post(api, data);
  }

  getTransaction(data: any): Observable<any> {
    const api = this.url + 'api/get_transaction';
    return this.http.post(api, data);
  }

  getTransactionFilter(data: any): Observable<any> {
    const api = this.url + 'api/get_transaction_filter';
    return this.http.post(api, data);
  }

  postAddSplitAmount(data: any): Observable<any> {
    const api = this.url + 'api/post_add_split_amount';
    return this.http.post(api, data);
  }

  postAddBudget(data: any): Observable<any> {
    const api = this.url + 'api/post_add_budget';
    return this.http.post(api, data);
  }

  getBudget(data: any): Observable<any> {
    const api = this.url + 'api/get_budget_by_account';
    return this.http.post(api, data);
  }

  postAddSplitBudget(data: any): Observable<any> {
    const api = this.url + 'api/post_add_split_budget';
    return this.http.post(api, data);
  }

  getBudgetByUser(data: any): Observable<any> {
    const api = this.url + 'api/get_budget_by_user';
    return this.http.post(api, data);
  }
}
