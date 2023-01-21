import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthRegisterRequest } from 'src/app/models/AuthRegisterRequest';
import { AuthService } from '../auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRegisterRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private nav: NavController
  ) {
    this.authRequest = {
      username: '',
      password: '',
      role: '',
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
    };
    this.loginError = false;
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    this.auth.register$(this.authRequest).subscribe({
      next: () => this.router.navigate(['/'], { replaceUrl: true }),
      error: (err) => {
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      },
    });
  }

  goTo(path: string) {
    this.nav.navigateForward(path, { animated: false });
  }

  displayLoginForm() {
    this.nav.navigateForward('/login', { animated: false });
  }

  setUsername(username: string) {
    this.authRequest.username = username;
  }

  setPassword(password: string) {
    this.authRequest.password = password;
  }

  setRole(role: string) {
    console.log('role changed', role);
    this.authRequest.role = role;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    console.log('image', imageUrl);
  }
}
