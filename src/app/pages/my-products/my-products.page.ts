import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements  ViewDidLeave, ViewWillEnter {
  products?: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}


  ionViewWillEnter(): void {
    console.log('will enter');
    this.init();
  }

  ionViewDidLeave(): void {
    console.log('destroy');
    this.products = [];
  }

  async init() {
    console.log('init');
    this.products = await this.productService.getMine({ forceFetchio: true});
    console.log(this.products);
  }

  goToProduct(product: Product) {
    this.router.navigate(['products', product._id]);
  }

  search($event: Event) {
    throw new Error('Method not implemented.');
  }

  goToCreateProduct() {
    this.router.navigate(['products', 'create']);
  }
}
