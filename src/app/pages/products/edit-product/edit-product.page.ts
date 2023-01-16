import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  product?: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    const productID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(productID);
    if (!productID) return;
    this.product = await this.productService.get(productID);
  }
}
