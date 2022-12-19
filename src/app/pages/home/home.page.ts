import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ProductService } from 'src/app/shared/services/models/product/product.service';
import { MetadataOverride } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
 
})
export class HomePage implements OnInit {
  user?: User;
  maDate?: Date;
  products?: Product[];

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private productService: ProductService
  ) {}
  async init() {
    this.user = this.authService.getUser();
    this.maDate = new Date();
    
    this.products = await this.productService.getAll();
  }
  ngOnInit() {
    this.init();
  }

  showLoading() {
    this.loadingService.showLoading('Chargement...', {
      duration: 3000,
      backDrop: false,
    });
  }
}
