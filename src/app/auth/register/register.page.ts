import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import {MenuController,AlertController,LoadingController,ToastController,IonContent,IonGrid,IonRow,IonCol,IonCard,IonCardContent,IonItem,IonIcon,IonInput,IonSelect,IonSelectOption,IonButton,IonFooter,IonToolbar,IonTitle,IonCheckbox} from '@ionic/angular/standalone';
import * as CryptoJS from 'crypto-js';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonTitle,IonToolbar,IonFooter,IonButton,IonIcon,IonItem,IonCardContent,IonCard,IonCol,IonRow,IonGrid,IonContent,IonInput,IonSelect,IonSelectOption,IonCheckbox,CommonModule,ReactiveFormsModule,],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private menu: MenuController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.formBuilder.group(
      {
        fname: ['', [Validators.required]],
        lname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$'
            ),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        currency: ['USD', [Validators.required]],
        termsAccepted: [false, [Validators.requiredTrue]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ notMatching: true });
    }

    return null;
  }

  get fname() {
    return this.registerForm.get('fname');
  }
  get lname() {
    return this.registerForm.get('lname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get currency() {
    return this.registerForm.get('currency');
  }
  get termsAccepted() {
    return this.registerForm.get('termsAccepted');
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  encryptPassword(password: string): string {
    const secretKey = 'myExpenses';
    const hashedKey = CryptoJS.enc.Hex.parse(
      CryptoJS.SHA256(secretKey).toString()
    );

    const encrypted = CryptoJS.AES.encrypt(password, hashedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString(); // This will be the encrypted password string
  }

  async onSubmit() {
    if (!this.registerForm.valid) return;

    const loading = await this.loadingController.create({
      message: 'Creating account...',
      spinner: 'crescent',
    });
    await loading.present();

    const userData = {
      first_name: this.fname?.value,
      last_name: this.lname?.value,
      email: this.email?.value,
      phone: this.phone?.value,
      currency: this.currency?.value,
      password: this.encryptPassword(this.password?.value),
    };

    this.api.postRegisterUsers(userData).subscribe({
      next: async (res) => {
        await loading.dismiss();

        if (res.status_code == 200) {
          const toast = await this.toastController.create({message: 'Registration successful!',duration: 2000,color: 'success',position: 'bottom',});
          await toast.present();
          this.registerForm.reset();
          this.router.navigate(['/login']);
        } else {
          await this.presentToast(res.error, 'warning');
        }
      },
      error: async () => {
        await loading.dismiss();
        this.showErrorAlert(
          'Registration Failed',
          'There was an error creating your account. Please try again.'
        );
      },
    });
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showTerms() {
    const alert = await this.alertController.create({
      header: 'Terms & Conditions',
      message:
        'By creating an account, you agree to our Terms of Service and Privacy Policy. We will process your personal information in accordance with these terms.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }
}
