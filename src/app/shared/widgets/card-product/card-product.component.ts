import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() product?: Product;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.product);
  }

  goToProduct(product: Product) {
    this.router.navigate(['products', product._id]);
  }
}
