import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/shared/services/models/category/category.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  @Input() product?: Product;

  form: FormGroup;
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    const categories = await this.categoryService.getAll();
    this.categories = categories;

    console.log(this.product);
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
