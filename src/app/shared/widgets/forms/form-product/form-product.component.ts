import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  @Input() product?: Product;

  form: FormGroup;
  categories: any[] = [];

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.product);

    //fill datas with product
    if (this.product) {
      this.form.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        category: this.product.category,
      });
    }
  }

  submit() {
    console.log(this.form.value);
  }
}
