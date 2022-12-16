import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpService) {}

  products: Product[] = [];

  async getAll({ forceFetchio = false } = {}) {
    if (this.products.length && !forceFetchio) {
      return this.products;
    }
    const products = await this.http.get('products');
    this.products = products;
    return products;
  }

  async get(id: number, { forceFetchio = false } = {}) {
    let product: Product | undefined = this.products.find(
      (product) => product.id === id
    );
    if (product && !forceFetchio) {
      return product;
    }

    product = await this.http.get(`products/${id}`);
    return product;
  }

  async create(product: Product) {
    const newProduct = await this.http.post('products', product);
    this.products.push(newProduct);
    return newProduct;
  }

  async update(product: Product) {
    const updatedProduct = await this.http.put(
      `products/${product.id}`,
      product
    );
    this.products = this.products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    return updatedProduct;
  }

  async delete(id: number) {
    await this.http.delete(`products/${id}`);
    this.products = this.products.filter((product) => product.id !== id);
  }
}
