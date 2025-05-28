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

  //////////////////////////////////////////////////////////////////////////////////

  postRegisterUsers(data: any): Observable<any> {
    const api = this.url + 'api/register';
    return this.http.post(api, data);
  }

  postLoginUsers(data: any): Observable<any> {
    const api = this.url + 'api/login';
    return this.http.post(api, data);
  }

  //////////////////////////////////////////////////////////////////////////////////

  getAccount(): Observable<any> {
    const api = this.url + 'api/get_acc';
    return this.http.get(api);
  }

  getAccountByUser(data: any): Observable<any> {
    const api = this.url + 'api/get_acc_by_user';
    return this.http.post(api, data);
  }

  postAddAccount(data: any): Observable<any> {
    const api = this.url + 'api/post_add_acc';
    return this.http.post(api, data);
  }

  getAccountByID(data: any): Observable<any> {
    const api = this.url + 'api/get_acc_by_id';
    return this.http.post(api, data);
  }

  getAccountChart(data: any): Observable<any> {
    const api = this.url + 'api/get_acc_chart';
    return this.http.post(api, data);
  }

  //////////////////////////////////////////////////////////////////////////////////

  postAddTransaction(data: any): Observable<any> {
    const api = this.url + 'api/post_add_transaction';
    return this.http.post(api, data);
  }

  getTransaction(data: any): Observable<any> {
    const api = this.url + 'api/get_transaction';
    return this.http.post(api, data);
  }

  getTransactionChart(data: any): Observable<any> {
    const api = this.url + 'api/get_transaction_chart';
    return this.http.post(api, data);
  }

  getTransactionFilter(data: any): Observable<any> {
    const api = this.url + 'api/get_transaction_filter';
    return this.http.post(api, data);
  }

  getTransactionByAccount(data: any): Observable<any> {
    const api = this.url + 'api/get_transaction_by_account';
    return this.http.post(api, data);
  }

  //////////////////////////////////////////////////////////////////////////////////

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

  getBudgetByID(id: any): Observable<any> {
    const api = this.url + 'api/get_budget_by_id';
    return this.http.post(api, id);
  }

  getBudgetLineChart(data: any): Observable<any> {
    const api = this.url + 'api/get_budget_chart';
    return this.http.post(api, data);
  }

  //////////////////////////////////////////////////////////////////////////////////

  getIcons(): Observable<any> {
    const api = this.url + 'api/get_icons';
    return this.http.get(api);
  }

  getAccountType(): Observable<any> {
    const api = this.url + 'api/get_acc_type';
    return this.http.get(api);
  }

  getCategories(): Observable<any> {
    const api = this.url + 'api/get_categories';
    return this.http.get(api);
  }
}
