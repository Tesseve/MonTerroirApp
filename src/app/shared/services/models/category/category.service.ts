import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Category } from 'src/app/models/Category';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [];

  constructor(private http: HttpService) {}

  async getAll({ forceFetchio = false } = {}) {
    if (this.categories.length && !forceFetchio) {
      return this.categories;
    }
    const categories = await this.http.get('categories');
    this.categories = categories;
    return categories;
  }
}
