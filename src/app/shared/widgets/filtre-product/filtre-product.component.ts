import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from '../../services/models/category/category.service';

@Component({
  selector: 'app-filtre-product',
  templateUrl: './filtre-product.component.html',
  styleUrls: ['./filtre-product.component.scss'],
})
export class FiltreProductComponent implements OnInit {
  @Output() onCategorieSelected = new EventEmitter<Category | null>();

  categories: Category[] = [];
  selectedCategorieId?: string;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    const categories = await this.categoryService.getAll();
    this.categories = categories;
  }

  async selectCategorie(category: Category | null) {
    if (category?._id == this.selectedCategorieId) {
      category = null;
      this.selectedCategorieId = undefined;
    } else {
      this.selectedCategorieId = category?._id;
    }
    this.onCategorieSelected.emit(category);
  }
}
