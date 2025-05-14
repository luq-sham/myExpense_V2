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

  async customComfirmationAlert( header: string, msg: string, confirmMsg?: string, cancleMsg?: string, css?: string ) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      cssClass: css ? css : 'custom-alert',
      buttons: [
        {
          text: cancleMsg ? cancleMsg : 'Cancel',
          role: 'cancel'
        },
        {
          text: confirmMsg ? confirmMsg : 'Confirm',
          role: 'confirm',
          cssClass: css ? 'confirm-red' : ''  // Apply red only if css is passed
        },
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
}