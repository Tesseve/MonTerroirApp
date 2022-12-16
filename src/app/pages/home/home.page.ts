import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {}

  showLoading() {
    this.loadingService.showLoading('Chargement...', {
      duration: 3000,
      backDrop: false,
    });
  }
}
