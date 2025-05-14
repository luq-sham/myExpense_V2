import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading:any;

  constructor(
    private loadingCtr: LoadingController
  ) { }

  async showLoading(){
    if(!this.loading){
      this.loading = await this.loadingCtr.create({
        cssClass:'loading',
        message: 'Please wait...',
        backdropDismiss: false
      });

      await this.loading.present()
    }
  }

  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
