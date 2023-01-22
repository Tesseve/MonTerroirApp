import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    duration: number = 5000,
    { color = 'primary' } = {}
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
    });
    await toast.present();
  }

  async presentErrorToast(message: string, duration?: number) {
    await this.presentToast(message, duration, { color: 'danger' });
  }

  async presentSuccessToast(message: string, duration?: number) {
    await this.presentToast(message, duration, { color: 'success' });
  }

  async presentWarningToast(message: string, duration?: number) {
    await this.presentToast(message, duration, { color: 'warning' });
  }

  async presentInfoToast(message: string, duration?: number) {
    await this.presentToast(message, duration, { color: 'info' });
  }

  async presentDarkToast(message: string, duration?: number) {
    await this.presentToast(message, duration, { color: 'dark' });
  }

  async presentLightToast(message: string, duration?: number) {
    await this.presentToast(message, duration, { color: 'light' });
  }
}
