import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthRequest } from 'src/app/models/AuthRequest';
import { AuthService } from '../auth.service';

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
  authRequest: AuthRequest;

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

    console.log('Logging in...');
    console.log(this.authRequest);

    // Perform the authentication request to the API.
    this.auth.logIn$(this.authRequest).subscribe({
      next: () => this.router.navigate(['/'], { replaceUrl: true }),
      error: (err) => {
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      },
    });
  }

  displayLoginForm() {
    this.nav.navigateForward('/login', { animated: false });
  }
}
