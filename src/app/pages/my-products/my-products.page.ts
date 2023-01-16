import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {
  products?: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.products = await this.productService.getMine();
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
