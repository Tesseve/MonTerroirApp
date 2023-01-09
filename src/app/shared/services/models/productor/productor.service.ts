import { Injectable } from '@angular/core';
import { Productor } from 'src/app/models/Productor';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductorService {
  constructor(private http: HttpService) {}

  productors: Productor[] = [];

  async getAllNearby({
    forceFetchio = false,
    location = '',
    distance = 3000,
  } = {}) {
    if (this.productors.length && !forceFetchio) {
      return this.productors;
    }
    let query = '';
    if (location && distance > 0) {
      query = `?location=${location}&distance=${distance}`;
    }
    const url = 'productors' + query;
    const productors = await this.http.get(url);
    this.productors = productors;
    return productors;
  }

  async getAll({ forceFetchio = false } = {}) {
    return this.getAllNearby({ forceFetchio, location: '', distance: 0 });
  }

  async getAllBySearch(text: string): Promise<Productor[]> {
    const productors = await this.http.get(`productors/search/${text}`);
    return productors;
  }

  async get(id: number, { forceFetchio = false } = {}) {
    let productor: Productor | undefined = this.productors.find(
      (productor) => productor.id === id
    );
    if (productor && !forceFetchio) {
      return productor;
    }

    productor = await this.http.get(`productors/${id}`);
    return productor;
  }

  async create(productor: Productor) {
    const newProductor = await this.http.post('productors', productor);
    this.productors.push(newProductor);
    return newProductor;
  }

  async update(productor: Productor) {
    const updatedProductor = await this.http.put(
      `productors/${productor.id}`,
      productor
    );
    this.productors = this.productors.map((productor) =>
      productor.id === updatedProductor.id ? updatedProductor : productor
    );
    return updatedProductor;
  }

  async delete(id: number) {
    await this.http.delete(`productors/${id}`);
    this.productors = this.productors.filter(
      (productor) => productor.id !== id
    );
  }
}
