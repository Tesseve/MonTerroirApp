import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user: User | undefined;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser$().subscribe((user) => (this.user = user));
  }

  logout() {
    this.authService.logout();
  }
}
