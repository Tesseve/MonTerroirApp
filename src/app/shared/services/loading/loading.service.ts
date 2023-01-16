import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  #canDisplayLoading = true;

  forceHidingLoader() {
    this.#canDisplayLoading = false;
  }

  forceDisplayingLoader() {
    this.#canDisplayLoading = true;
  }

  async executeWithoutLoading<T>(callback: () => Promise<T>): Promise<T> {
    this.forceHidingLoader();
    const result = await callback();
    this.forceDisplayingLoader();
    return result;
  }

  async showLoading(
    message?: string,
    { duration = 1000, backDrop = true } = {}
  ) {
    if (!this.#canDisplayLoading) return;
    const loading = await this.loadingController.create({
      message: message || 'Chargement...',
      duration: duration,
      spinner: 'circles',
      backdropDismiss: backDrop ?? true,
    });

    await loading.present();
  }

  async hideLoading() {
    // check if there is any loading
    const loading = await this.loadingController.getTop();
    if (!loading) return;
    await this.loadingController.dismiss();
  }
}
