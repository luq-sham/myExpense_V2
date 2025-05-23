import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonButtons,
  IonIcon,
  IonTextarea,
  IonFooter,
  IonSearchbar,
  IonNote,
  IonRadioGroup,
  IonRadio,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
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
  imports: [
    IonSegmentButton,
    IonSegment,
    IonNote,
    // IonSearchbar,
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    // IonDatetime,
    // IonDatetimeButton,
    // IonModal,
    IonButton,
    IonIcon,
    // IonTextarea,
    IonButtons,
    IonFooter,
    ErrorMessagePage,
  ],
})
export class AddComponent implements OnInit {
  title: any;
  formID: any;

  isSubmitted = false;
  AccountForm!: FormGroup;
  transactionForm!: FormGroup;
  params: any;
  label:any
  formDisable:any

  
  currentDate: string = new Date().toISOString();
  types: any = [];
  income:any
  expenses:any
  categories:any

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
    //New Account API
    if (this.formID == 1) {
      this.api.getAccountType().subscribe((res) => {
        this.types = res.return_data;
      });
    }
    if (this.formID == 2) {
      this.api.getTransactionCategories().subscribe((res)=>{
        this.income = res.income
        this.expenses = res.expense
        this.categories = res.expense
        this.label = 'Expenses'
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
    if (this.formID == 2) {
      this.transactionForm = this.fb.group({
        transaction_amount: ['', [Validators.required]],
        transaction_type: ['expenses', [Validators.required]],
        transaction_category: ['', [Validators.required]],
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
      this.label = 'expenses';
      this.categories = this.expenses;
    }
  }

  get accounts() {
    return this.AccountForm.controls;
  }

  get transactions() {
    return this.transactionForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset)
      .toISOString()
      .slice(0, -1);

    //New Account Form
    if (this.formID == 1) {
      if (this.AccountForm.invalid) {
        console.log('Form is invalid');
        return;
      }

      this.alert
        .customComfirmationAlert(
          'New Account',
          'Are you sure to added this account?'
        )
        .then((res) => {
          if (res == 'confirm') {
            this.loading.showLoading();
            const param = {
              ...this.AccountForm.value,
              user_id: localStorage.getItem('token'),
              created_at: localISOTime,
              updated_at: localISOTime,
            };
            this.api.postAddAccount(param).subscribe((res) => {
              this.loading.hide();
              if (res.status_code == 200) {
                this.toast.customToast(
                  'Account successfully been added',
                  3000,
                  'success'
                );
                this.modalController.dismiss(true);
              } else {
                this.toast.customToast(
                  'Account failed to been added. Please try again.',
                  3000,
                  'warning'
                );
              }
            });
            console.log('Account Data:', param);
          }
        });
    }

    //New Transaction
    if (this.formID == 2) {
      if (this.transactionForm.invalid) {
        console.log('Form is invalid');
        return;
      }
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
