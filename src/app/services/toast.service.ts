import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
  ) { 

  }

  async customToast(msg?: string, duration?: number, color?: string, position?: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      message: msg ?? 'Message',
      duration: duration ?? 2000,
      color: color ?? 'success',
      position: position ?? 'bottom',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
