import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthRequest } from '../../models/AuthRequest';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

/**
 * Login page.
 */
@Component({
  templateUrl: 'login.page.html',
})
export class LoginPage {
  authRequest: AuthRequest;
  loginError: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private nav: NavController,
    private loadingService: LoadingService
  ) {
    this.authRequest = {
      username: '',
      password: '',
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

    this.loadingService.showLoading('Connexion...');

    // Perform the authentication request to the API.
    this.auth.logIn$(this.authRequest).subscribe({
      next: () => {
        this.loadingService.hideLoading();
        return this.router.navigate(['/'], { replaceUrl: true });
      },
      error: (err) => {
        this.loadingService.hideLoading();
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      },
    });
  }

  displayRegisterForm() {
    this.nav.navigateForward('/register', { animated: false });
  }

  setUsername(username: string) {
    this.authRequest.username = username;
  }

  setPassword(password: string) {
    this.authRequest.password = password;
  }
}
