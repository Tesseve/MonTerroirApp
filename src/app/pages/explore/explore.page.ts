import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Productor } from 'src/app/models/Productor';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';
import { PositionService } from 'src/app/shared/services/gps/position.service';
import { ProductorService } from 'src/app/shared/services/models/productor/productor.service';
import { Category } from 'src/app/models/Category';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  products?: Product[];

  constructor(
    private navController: NavController,
    private loadingController: LoadingService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    this.products = await this.productService.getAll({
      forceFetchio: true,
    });
  }

  goToMap() {
    this.navController.navigateForward('explore/map', { animated: false });
  }

  async search($event: any) {
    this.loadingController.forceHidingLoader();
    const text = $event.target.value;
    console.log(text);
    this.products = await this.productService.getBySearch(text);
    console.log(this.products);
    this.loadingController.forceDisplayingLoader();
  }

  goToProductor(productor: Productor) {
    this.navController.navigateForward(`productors/${productor._id}`, {
      animated: false,
    });
  }

  onCategorySelected($event: Category | null) {
    console.log($event);
    this.getProductsByCategory($event);
  }

  async getProductsByCategory(category: Category | null) {
    this.products = await this.productService.getByCategory(
      category ? category._id : null
    );
  }
}
