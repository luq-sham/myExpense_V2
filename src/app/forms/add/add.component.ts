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
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [
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
  ],
})
export class AddComponent implements OnInit {
  transactionForm!: FormGroup;
  isSubmitted = false;
  currentDate: string = new Date().toISOString();

  title: any;
  formID: any;

  types: any = [];
  params: any;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private api: ApiService,
    private loading: LoadingService,
    private toast: ToastService,
    private alert: AlertService
  ) {}

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
  }

  formBuilder() {
    //New Account API
    if (this.formID == 1) {
      this.transactionForm = this.fb.group({
        account_name: ['', [Validators.required]],
        account_type: ['', Validators.required],
        balance: [0, Validators.required],
      });
    }
  }

  get f() {
    return this.transactionForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset)
      .toISOString()
      .slice(0, -1);

    if (this.transactionForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    if (this.formID == 1) {
      this.alert
        .customComfirmationAlert(
          'New Account',
          'Are you sure to added this account?'
        )
        .then((res) => {
          if (res == 'confirm') {
            this.loading.showLoading();
            const param = {
              ...this.transactionForm.value,
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
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
