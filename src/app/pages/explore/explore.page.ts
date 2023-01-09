import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Productor } from 'src/app/models/Productor';
import { PositionService } from 'src/app/shared/services/gps/position.service';
import { ProductorService } from 'src/app/shared/services/models/productor/productor.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  productors: Productor[] = [];

  constructor(
    private navController: NavController,
    private productorService: ProductorService,
    private positionService: PositionService
  ) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    const position = await this.positionService.getCurrentPosition();

    let location = undefined;
    if (position) {
      location = `${position.coords.latitude},${position.coords.longitude}`;
    }

    this.productors = await this.productorService.getAll({
      forceFetchio: true,
    });
  }

  goToMap() {
    this.navController.navigateForward('explore/map', { animated: false });
  }

  async search($event: any) {
    const text = $event.target.value;
    console.log(text);

    this.productors = await this.productorService.getAllBySearch(text);
  }
}
