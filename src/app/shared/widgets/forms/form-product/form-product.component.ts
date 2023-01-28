import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/shared/services/models/category/category.service';
import { ProductService } from 'src/app/shared/services/models/product/product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  @Input() product?: Product;

  form: FormGroup;
  categories: Category[] = [];

  images: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
      images: new FormControl([], []),
    });
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    const categories = await this.categoryService.getAll();
    this.categories = categories;

    console.log(this.product?.images);
    if (this.product) {
      this.form.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        categories: this.product.categories.map((c) => c._id),
      });
    }
  }

  async submit() {
    if (this.form.invalid) {
      console.log('Invalid form');
      console.log(this.form.value);

      await this.toastService.presentErrorToast(
        'Veuillez remplir tous les champs'
      );
      return;
    }

    const datas = this.form.value;
    datas.images = this.images;
    console.log(datas);

    if (!this.product) {
      const res = await this.productService.create(datas);
      console.log(res);

      if (res) {
        this.productService.myProducts.push(res);
      }
    } else {
      const res = await this.productService.update(this.product._id, datas);
      console.log(res);
    }

    this.form.reset();
    this.router.navigate(['my-products']);
  }

  onImageUploaded(data: string) {
    this.images = [];
    this.images.push(data);
  }
}
