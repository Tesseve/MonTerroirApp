import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user: User | undefined;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
