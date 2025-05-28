import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonButton, IonButtons, IonIcon, IonTextarea, IonFooter, IonNote, IonSegment, IonSegmentButton,  IonPopover  } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorMessagePage } from 'src/app/components/error-message/error-message.page';
import { ValidationTextService } from 'src/app/services/validation-text.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [IonPopover, IonSegmentButton, IonSegment, IonNote, CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonButtons, IonFooter, ErrorMessagePage, IonTextarea, IonDatetime ],
})
export class AddComponent implements OnInit {
  title: any;
  formID: any;

  isSubmitted = false;
  AccountForm!: FormGroup;
  transactionForm!: FormGroup;
  BudgetForm!: FormGroup;
  params: any;
  label:any
  formDisable:any

  
  now = new Date();
  offset = this.now.getTimezoneOffset() * 60000;
  currentDate = new Date(this.now.getTime() - this.offset).toISOString().slice(0, -1);

  types: any = [];
  income:any
  expenses:any
  categories:any
  accounts:any

  transaction_type:any

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private api: ApiService,
    private loading: LoadingService,
    private toast: ToastService,
    private alert: AlertService,
    private validationService: ValidationTextService
  ) {}
  validations: any = this.validationService.FormValidation('newForm');

  ngOnInit() {
    this.formBuilder();
    this.getData();
  }

  getData() {
    let param = {
      user_id:localStorage.getItem('token')
    }
    //New Account API
    if (this.formID == 1) {
      this.api.getAccountType().subscribe((res) => {
        this.types = res.return_data;
      });
    }

    //New Transaction
    if (this.formID == 2) {
      this.api.getCategories().subscribe((res)=>{
        this.income = res.income
        this.expenses = res.expense
        this.categories = res.expense
        this.label = 'Expenses'
      });
      this.api.getAccountByUser(param).subscribe((res)=>{
        this.accounts = res.return_data
      });
    }

    if(this.formID == 3){
      this.api.getCategories().subscribe((res)=>{
        this.categories = res.expense
      });
      this.api.getAccountByUser(param).subscribe((res)=>{
        this.accounts = res.return_data
      })
    }
  }

  formBuilder() {
    //New Account API
    if (this.formID == 1) {
      this.AccountForm = this.fb.group({
        account_name: ['', [Validators.required]],
        account_type: ['', Validators.required],
        balance: [0, Validators.required],
      });
    }

    //New Transactions
    if (this.formID == 2) {
      this.transactionForm = this.fb.group({
        transaction_amount: ['', [Validators.required]],
        transaction_type: ['expenses', [Validators.required]],
        transaction_category: ['', [Validators.required]],
        transaction_account: ['', [Validators.required]],
        transaction_description: [''],
        transaction_date: [this.currentDate.split('T')[0]],
      });
    }

    if(this.formID == 3){
      this.BudgetForm = this.fb.group({
        budget_name:['', Validators.required],
        budget_amount:['', Validators.required],
        budget_category:['', Validators.required],
        budget_account:['', Validators.required],
      })
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    //New Account Form
    if (this.formID == 1) {
      if (this.AccountForm.invalid) {
        console.log('Accounnt Form is invalid');
        return;
      }

      this.alert.customComfirmationAlert('New Account','Are you sure to added this account?').then((respons) => {
          if (respons == 'confirm') {
            this.loading.showLoading();
            const param = {
              ...this.AccountForm.value,
              user_id: localStorage.getItem('token'),
              created_at: this.currentDate,
              updated_at: this.currentDate,
            };
            this.api.postAddAccount(param).subscribe((res) => {
              this.loading.hide();
              if (res.status_code == 200) {
                this.toast.customToast('Account successfully been added',3000,'success');
                this.modalController.dismiss(true);
              } else {
                this.toast.customToast('Account failed to been added. Please try again.',3000,'warning');
              }
            });
            console.log('Account Data:', param);
          }
        });
    }

    //New Transaction
    if (this.formID == 2) {
      if (this.transactionForm.invalid) {
        console.log('Transaction Form is invalid');
        return;
      }
      this.alert.customComfirmationAlert('New Transaction','Are you sure to added this transaction?').then((respons) => {
        if(respons == 'confirm'){
          const dateOnly = this.transactionForm.value.transaction_date;
          const now = new Date();
          const fullDateTime = new Date(dateOnly + 'T' + now.toTimeString().slice(0,8));
          const param = {
            ...this.transactionForm.value,
            transaction_date: fullDateTime.toISOString(), // full datetime
            user_id: localStorage.getItem('token'),
            created_at: this.currentDate,
            updated_at: this.currentDate,
          };
          this.loading.showLoading()
          this.api.postAddTransaction(param).subscribe((res)=>{
            this.loading.hide();
            if(res.status_code == 200){
              this.toast.customToast('Transaction successfully been added',3000,'success');
              this.modalController.dismiss(true);
            }else{
              this.toast.customToast('Transaction failed to been added',3000,'warning');
            }
          });
          console.log('Account Data:', param);
        }
      })
    }

    if(this.formID == 3){
      if(this.BudgetForm.invalid){
        console.log('Budget Form is invalid');
        return;
      }

      this.alert.customComfirmationAlert('New Budget','Are you sure to added this budget?').then((respons) => {
        if(respons == 'confirm'){
          this.loading.showLoading()
          const param = {
            ...this.BudgetForm.value,
            user_id: localStorage.getItem('token'),
            created_at: this.currentDate,
            updated_at: this.currentDate,
          }
          this.api.postAddBudget(param).subscribe((res)=>{
            if(res.status_code == 200){
              this.loading.hide();
              this.toast.customToast('Budget successfully been added',3000,'success');
              this.modalController.dismiss(true)
            }else if(res.status_code == 400){
              this.loading.hide();
              this.toast.customToast(res.msg,3000,'warning');
            }else{
              this.loading.hide();
              this.toast.customToast('Budget failed to been added',3000,'warning');
            }
          })
          console.log('Budget Data',param)
        }
      });

    }
  }

   getCategory(values: any) {
    const value = values.detail.value;
    this.formDisable = false;

    if (value == 'income') {
      this.label = 'Income';
      this.categories = this.income;
    } else if (value == 'expenses') {
      this.label = 'Expenses';
      this.categories = this.expenses;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
