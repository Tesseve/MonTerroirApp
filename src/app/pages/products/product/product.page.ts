import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product?: Product;
  canEdit: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.product = await this.productService.get(id);
    console.log(this.product);

    if (this.product) {
      const userProducts = this.authService.getUser()?.products;
      if (userProducts) {
        this.canEdit = userProducts
          .map((p) => p._id)
          .includes(this.product._id);
      }
    }
  }
}
