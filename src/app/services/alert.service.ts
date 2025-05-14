// services/alert.service.ts
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  constructor(private alertController: AlertController) { }
  
  async customAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        role: 'confirm'
      }]
    });

    await alert.present();
    return alert;
  }
}