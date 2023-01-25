import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/models/Product';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpService, private authService: AuthService) {}

  products: Product[] = [];

  myProducts: Product[] = [];

  async getAll({ forceFetchio = false } = {}) {
    if (this.products.length && !forceFetchio) {
      return this.products;
    }
    const products = await this.http.get('products');
    this.products = products;
    return products;
  }

  async get(id: string, { forceFetchio = false } = {}) {
    let product: Product | undefined = this.products.find(
      (product) => product._id === id
    );
    if (product && !forceFetchio) {
      return product;
    }

    product = await this.http.get(`products/${id}`);
    return product;
  }

  async create(value: any) {
    const newProduct = await this.http.post('products', value);
    this.products.push(newProduct);
    return newProduct;
  }

  async update(productID: string, value: any) {
    const updatedProduct = await this.http.put(`products/${productID}`, value);
    this.products = this.products.map((product) =>
      product._id === updatedProduct.id ? updatedProduct : product
    );
    return updatedProduct;
  }

  async delete(id: string) {
    await this.http.delete(`products/${id}`);
    this.myProducts = this.myProducts.filter((product) => product._id !== id);
    this.products = this.products.filter((product) => product._id !== id);
  }

  async getMine({ forceFetchio = false } = {}): Promise<Product[] | undefined> {
    if (this.myProducts.length && !forceFetchio) {
      return this.myProducts;
    }
    const products = await this.http.get('products/mine');
    this.myProducts = products;
    return products;
  }

  async getByCategory(category: string | null) {
    let url = 'products';
    if (category) {
      url += '?category=' + category;
    }
    const products = await this.http.get(url);
    return products;
  }
}
