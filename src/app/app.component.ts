import { Component, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(storage: Storage, private renderer: Renderer2) {
    storage.create();
    this.checkModernAppleVariants();
  }

  checkModernAppleVariants() {
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    let ratio = window.devicePixelRatio || 1;
    let screen = {
      width: window.screen.width * ratio,
      height: window.screen.height * ratio,
    };

    if (iOS && screen.width >= 1125 && screen.height >= 2436) {
      console.log('iPhone X detected');
      this.renderer.addClass(document.body, 'is-iphone-x');
    } else {
      console.log('iPhone X not detected');
    }
  }
}
