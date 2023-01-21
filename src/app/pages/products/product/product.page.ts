import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  canDelete: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
      await this.productService.getMine({ forceFetchio: true });
      console.log(this.productService.myProducts);
        this.canEdit = this.productService.myProducts
          .map((p) => p._id)
          .includes(this.product._id);
        this.canDelete = this.canEdit;
    }
  }

  async delete() {
    if(!this.product) return;
    await this.productService.delete(this.product._id);
    this.router.navigate(['/my-products']);
  }
}
