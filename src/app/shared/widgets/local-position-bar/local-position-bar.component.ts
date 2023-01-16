import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../services/gps/position.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-local-position-bar',
  templateUrl: './local-position-bar.component.html',
  styleUrls: ['./local-position-bar.component.scss'],
})
export class LocalPositionBarComponent implements OnInit {
  name: string = '';

  constructor(
    private positionService: PositionService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.loadingService.forceHidingLoader();
    const position: any = await this.positionService.getActualAddress();
    this.loadingService.forceDisplayingLoader();
    console.log('Actual address: ', position);
    if (!position) return;
    this.name = position.name;
  }
}
