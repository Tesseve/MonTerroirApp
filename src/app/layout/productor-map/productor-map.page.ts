import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-productor-map',
  templateUrl: './productor-map.page.html',
  styleUrls: ['./productor-map.page.scss'],
})
export class ProductorMapPage implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
