import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraPluginPermissions,
} from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-form-input-image',
  templateUrl: './form-input-image.component.html',
  styleUrls: ['./form-input-image.component.scss'],
})
export class FormInputImageComponent implements OnInit {
  @Output() onImageUploaded = new EventEmitter();

  constructor(private actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  async chooseTypePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: async () => {
            await this.takePicture(CameraSource.Photos);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async takePicture(source: CameraSource) {
    const permissions = await Camera.requestPermissions();
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    const data = image.base64String;
    this.onImageUploaded.emit(data);
  }
}
