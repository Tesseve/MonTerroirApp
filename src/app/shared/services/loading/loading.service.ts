import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  async showLoading(
    message?: string,
    { duration = undefined, backDrop = true } = {}
  ) {
    const loading = await this.loadingController.create({
      message: message || 'Chargement...',
      duration: duration,
      spinner: 'circles',
      backdropDismiss: backDrop ?? true,
    });

    loading.present();
  }

  async hideLoading() {
    await this.loadingController.dismiss();
  }
}
