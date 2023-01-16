import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product?: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.product = await this.productService.get(id);
    console.log(this.product);
  }
}
