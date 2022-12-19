import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/shared/services/models/product/product.service';


@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() product?:Product;

  constructor() {
    
  }

  ngOnInit() {
   console.log(this.product);
  }

}
